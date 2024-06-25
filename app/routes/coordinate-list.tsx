/**
 * メモ
 *  PostmanでリクエストするURL（このファイルで実装されたAPI）

（例）
# shopify.app.toml > application_url の値を使う
# この値は、 npm run dev する度に変わります。
api_base_url=https://death-pets-fabulous-reseller.trycloudflare.com

curl -X POST --location "${api_base_url}/api/wishlist" \
  --form 'customerId="123"' \
  --form 'productId="431"' \
  --form 'shop="example.com"' \
  --dump-header -

*/

import { json, ActionFunctionArgs } from "@remix-run/node";
import db from "../db.server";
import { OgneApiClient } from "app/services/ogne-api/ogne-api-client";
import { OgneCoordinateList } from "app/services/ogne-api/response/ogne-coordinate-list";
import { OgneCoordinateListParameters } from "app/services/ogne-api/parameters/ogne-coordinate-list-parameters";
import { cors } from "remix-utils/cors"
import CoordinateList from "app/components/CoordinateList"
import { useActionData } from '@remix-run/react';



export async function loader() {
  const settings = db.settings.findFirst()
  return json({
    name: 'バックエンドに到達',
  });
}

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  console.log("request", request);
  console.log("pathParams", params);

  const method = request.method;
  const requestBody = await request.json();
  console.log("request.json", requestBody);

  if (method !== "POST") {
    return requestBody({ error: "Method not allowed" }, { status: 405 });
  }
  if (! (requestBody instanceof Object)){
    return requestBody({ error: "Request body is empty" }, { status: 400 });
  }

  const jsonParameter: Record<string, any> = requestBody
  const coordinateListParameters = new OgneCoordinateListParameters(jsonParameter)

  const ogneApiClient = new OgneApiClient();
  const coordinateList = await ogneApiClient.getCoordinateList(coordinateListParameters);

  const responseBody = {
    message: "this_is_coordinate_list",
    pathParams: params,
    requestBody: requestBody,
  }
  const response = new Response(
    JSON.stringify(responseBody)
  );
  return {
    coordinateList: coordinateList,
    jsonParameter: jsonParameter,
  }
}

const CoordinateListContent = () => {
  const actionData = useActionData<{ coordinateList: OgneCoordinateList }>();

  return (
    <CoordinateList coordinateList={actionData.coordinateList} />
  );
}

export default CoordinateListContent
