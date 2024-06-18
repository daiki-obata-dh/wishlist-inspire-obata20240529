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


import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors"

export async function loader() {
  const settings = db.settings.findFirst()
  return json({
    name: 'バックエンドに到達',
  });
  return json({
    name: settings.name,
    description: settings.description,
  });
}

export async function action({ request }) {
  const method = request.method;
  let data = await request.formData();
  data = Object.fromEntries(data);

  const customerId = data.customerId;
  const productId = data.productId || null;
  const shop = data.shop || null;

  // 商品ページでliquidを埋め込んでいないので、productIdが取れないのでコメントアウト
  // if (!customerId || !productId || !shop) {
  //   return json({
  //     message: "Missing required fields",
  //     method: method,
  //   });
  // }



  switch (method) {
    case "POST":
      const wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });

      const response = json({
        message: "Product added to wishlist",
        method: "POST",
        wishlist: wishlist,
      })
      return response;
      // cors() は、以下のエラーになったため、一旦使わない
      // return cors(response);
      //  エラー:
      //    15: 58: 36 │ remix      │ TypeError: Cannot read properties of undefined(reading 'toLowerCase')
      //    15: 58: 36 │ remix      │     at CORS.exec(file:///home/u103645094/ogne/appdev/wishlist-inspire-obata20240529/node_modules/remix-utils/build/server/cors.js:14:42)

    case "PATCH":
      return json({ message: "Success", method: "PAtCH" });

    default:
      return json({ error: "Method not allowed" }, { status: 405 });
  }
}
