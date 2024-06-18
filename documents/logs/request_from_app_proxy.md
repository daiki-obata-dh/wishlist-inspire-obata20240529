Shopify App Proxy 経由のリクエストの記録

url: のクエリパラメータが、このファイルにはあるが、 request_from_browser.md には無い。

signature=xxx は、認証に必要そう。
参考: https://rewired.cloud/how-to-determine-customer-request-on-shopify-app/



'''bash
request Request {
method: 'POST',
url: 'https://dh-ogne.myshopify.com/api/wishlist?shop=dh-ogne.myshopify.com&logged_in_customer_id=&path_prefix=%2Fapps%2Fwishlist&timestamp=1718699872&signature=134ada6818acbb0001c1a031142a29e74
                        7d41489b642b8b83de789a2b402ccb5',
headers: Headers {
  accept: '*/*',
  'accept-encoding': 'gzip',
  'accept-language': 'en',
  'cache-control': 'no-cache',
  'cdn-loop': 'cloudflare; subreqs=2',
  'cf-connecting-ip': '2a06:98c0:3600::103',
  'cf-ew-via': '14',
  'cf-ipcountry': 'JP',
  'cf-ray': '8959f5bcc3e01d9b-NRT',
  'cf-visitor': '{"scheme":"https"}',
  'cf-warp-tag-id': '9fd6d9ad-cbe0-4076-9307-319bf1555c98',
  'cf-worker': 'trycloudflare.com',
  connection: 'close',
  'content-length': '144',
  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary6dwBnwjtrb0CGLkV',
  'edge-bot-ja3hash': 'ebe6b4ae5d09071fcca70f39a8121bf0',
  'edge-bot-score': '97',
  'edge-client-bot': 'false',
  'edge-client-src-port': '60637',
  'edge-colo-code': 'NRT',
  'edge-ip': '23.227.38.74',
  'edge-zone-name': 'myshopify.com',
  host: 'mesa-naturally-disputes-approved.trycloudflare.com',
  origin: 'https://dh-ogne.myshopify.com',
  pragma: 'no-cache',
  priority: 'u=1, i',
  referer: 'https://dh-ogne.myshopify.com/?_ab=0&_fd=0&_sc=1',
  'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'x-forwarded-for': '2a06:98c0:3600::103',
  'x-forwarded-host': 'dh-ogne.myshopify.com',
  'x-forwarded-proto': 'https',
  'x-request-id': '2cfd6d2b-9366-4b59-80e8-21b46a94b9d4-1718699872',
  'x-shopify-client-ip': '221.240.181.186',
  'x-shopify-request-timing': 'cf;t=1718699872.169'
},
destination: '',
referrer: 'about:client',
referrerPolicy: '',
mode: 'cors',
credentials: 'same-origin',
cache: 'default',
redirect: 'follow',
integrity: '',
keepalive: false,
isReloadNavigation: false,
isHistoryNavigation: false,
signal: AbortSignal { aborted: false }
17:37:52 │ remix            │ }
17:37:52 │ remix            │ request.formData { customerId: '123' }
'''
