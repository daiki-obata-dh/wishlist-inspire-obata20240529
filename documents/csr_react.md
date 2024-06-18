```mermaid
%%{
    init: {
        "theme": "default",
        "noteAlign": "left",
        "logLevel": "debug"
    }
}%%

sequenceDiagram
    autonumber
    participant ブラウザ
    participant shopify_liquid as 【Shopify】<br/>テーマ拡張のliquidを<br/>デプロイした場所
    participant shopify_app_proxy as 【Shopify】<br/>App Proxy
    participant dh_shopify_backend as ＜DH＞<br/>Shopify公開アプリの<br/>バックエンド
    participant dh_api as ＜DH＞<br/>コーディネート情報<br>取得API

    ブラウザ-->>+shopify_liquid: GET アプリJSソース
    shopify_liquid->>-ブラウザ: Response<アプリJSソース>
    %%critical Remix（React）で実装したアプリJSソース処理
    Note over ブラウザ: function reactFunc() {<br/>　const ogneRes = await fetch('/app/proxy/of_ogne_get_coordinate')<br/>　return `<br/>　　<div><br/>　　　<img src={ogneRes.coordinateList[0].imageUrl}><br/>　　　<span>{ogneRes.coordinateList[0].title}</span><br/>　　　：<br/>　　</div><br/>　`<br/>}
    ブラウザ-->>+shopify_app_proxy: GET Coordinate
    Note over shopify_app_proxy: APIトークンなどの認証情報を付与して<br/>コーディネート情報取得APIを呼び出す
    shopify_app_proxy-->>+dh_shopify_backend: GET_Coordinate
    Note over dh_shopify_backend: ストアの認証処理
    Note over dh_shopify_backend: コーディネート情報取得APIの<br/>認証情報を取得する
    dh_shopify_backend-->>+dh_api: GET_Coordinate
    dh_api->>-dh_shopify_backend: Response<Coordinate>
    dh_shopify_backend->>-shopify_app_proxy: Response<Coordinate>
    shopify_app_proxy->>-ブラウザ: Response<Coordinate>
    Note right of ブラウザ: {<br/>　"coordinateList": [<br/>　　{<br/>　　　"imageUrl": "https://.../coordinate_image_001.jpg"<br/>　　　"title": "モノトーンでまとめたスタイル",<br/>　　},<br/>　　{<br/>　　　"imageUrl": "https://.../coordinate_image_002.jpg"<br/>　　　"title": "ノーカラージャケット・スカートの組み合わせ",<br/>　　},<br/>　]<br/>}
    Note over ブラウザ: Coordinateの情報を埋め込んだ<br/>HTMLソースを生成
    %%end
```

```css
document.head.innerHTML += `
    <style type="text/css">
        .actor[name="shopify_liquid"] {
            fill: aquamarine !important;
        }
        .actor[name="shopify_app_proxy"] {
            fill: aquamarine !important;
        }
        .actor[name="dh_shopify_backend"] {
            fill: antiquewhite !important;
        }
        .actor[name="dh_api"] {
            fill: antiquewhite !important;
        }
    </style>
`;
```
