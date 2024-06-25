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
import { OgneCoordinateDetailParameters } from "app/services/ogne-api/parameters/ogne-coordinate-detail-parameters";
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
  const coordinateDetailParameters = new OgneCoordinateDetailParameters({
    slug: params.slug,
  })

  const ogneApiClient = new OgneApiClient();
  const coordinateList = await ogneApiClient.getCoordinateList(coordinateDetailParameters);

  const responseBody = {
    message: "this_is_coordinate_detail",
    pathParams: params,
    requestBody: requestBody,
  }
  const response = new Response(
    JSON.stringify(responseBody)
  );
  return {
    coordinateList: coordinateList,
  }
}

const CoordinateDetailContent = () => {
  const actionData = useActionData<{ coordinateList: OgneCoordinateList }>();

  const coordinate = actionData.coordinateList.headElement;

  return (
    <div>
      {coordinate &&
        <div>
          <img
            src={coordinate.mainCoordinateImage.mainSizeUrl}
            alt={coordinate.mainCoordinateImage.alternativeText}
          />
          <div>
            <h3>{coordinate.title}</h3>
          </div>
        </div>
      }
    </div>
  );
}

export default CoordinateDetailContent
