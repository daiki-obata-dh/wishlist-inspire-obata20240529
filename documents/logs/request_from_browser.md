ブラウザからアプリバックエンドに直接リクエストしたときの記録

'''bash
request Request {
method: 'POST',
url: 'https://admin.shopify.com/api/wishlist',
headers: Headers {
  accept: '*/*',
  'accept-encoding': 'gzip',
  'accept-language': 'ja,en-US;q=0.9,en;q=0.8',
  'cache-control': 'no-cache',
  'cdn-loop': 'cloudflare; subreqs=1',
  'cf-connecting-ip': '221.240.181.186',
  'cf-ew-via': '15',
  'cf-ipcountry': 'JP',
  'cf-ray': '8959fa5c161f736e-NRT',
  'cf-visitor': '{"scheme":"https"}',
  'cf-warp-tag-id': '9fd6d9ad-cbe0-4076-9307-319bf1555c98',
  'cf-worker': 'trycloudflare.com',
  connection: 'close',
  'content-length': '144',
  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarys2DtfCqvwnhQgz0Z',
  host: 'mesa-naturally-disputes-approved.trycloudflare.com',
  origin: 'https://admin.shopify.com',
  pragma: 'no-cache',
  priority: 'u=1, i',
  referer: 'https://admin.shopify.com/',
  'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Linux"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'x-forwarded-for': '221.240.181.186',
  'x-forwarded-proto': 'https'
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
17:41:02 │ remix            │ }
17:41:02 │ remix            │ request.formData { customerId: '123' }
'''

## リクエスト方法
ローカルで npm run dev した状態で、
ブラウザのコンソールに以下のコードをコピペする

※ URLの「https://mesa-naturally-disputes-approved.trycloudflare.com」の部分は、npm run dev する度に変わります。

'''JavaScript
  function appProxyTest() {

    const formdata = new FormData();
    formdata.append("customerId", 123);

    const requestOptions = {
      // ---- GET用
      // method: 'GET',

      // ---- POST用
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    console.log('Fetch_to_proxy');
    fetch(`https://mesa-naturally-disputes-approved.trycloudflare.com/api/wishlist`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };
  appProxyTest();
'''


