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
import { useParams } from "@remix-run/react";
import db from "../db.server";
import { cors } from "remix-utils/cors"

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

  switch (method) {
    case "POST":
      const responseBody = {
        message: "this_is_coordinate_detail",
        pathParams: params,
        requestBody: requestBody,
      }
      const response = new Response(
        JSON.stringify(responseBody)
      );
      return response

    default:
      return requestBody({ error: "Method not allowed" }, { status: 405 });
  }
}
