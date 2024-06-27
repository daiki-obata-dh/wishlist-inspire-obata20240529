// TODO typescriptにする

// Shopify App Proxy のパス
const SHOPIFY_APP_PROXY_PATH = 'apps/wishlist';

// クエリパラメータの名前
const QUERY_PARAMETER_NAMES = {
    COORDINATE_SLUG: 'coordinate_slug',
};

// URLのパスパラメータのプレースホルダー
const PATH_PARAMETER_PLACEHOLDERS = {
    COORDINATE_SLUG: '__COORDINATE_SLUG__',
}

// OGNEコーディネートバックエンドのエンドポイント
const BACKEND_ENDPOINTS = {
    COORDINATE_LIST: 'coordinate-list/',
    COORDINATE_DETAIL: `coordinate-detail/${PATH_PARAMETER_PLACEHOLDERS.COORDINATE_SLUG}`,
};


/**
 * 画面の表示内容を、現在のアドレスバーのURLにふさわしい内容に更新します。
 *
 * @param {string} htmlContentContainerId 表示内容を反映するHTML要素のID
 * @returns {void}
 */
function loadCurrentPageContent(htmlContentContainerId) {
    console.log('loadCurrentPageContent start');

    const htmlContentContainer = document.getElementById(htmlContentContainerId);
    if (!htmlContentContainer) {
        return;
    }

    console.log('loadCurrentPageContent');

    const currentPageRequestParameters = getCurrentPageRequestParameters();
    const backendPath = getBackendPath(currentPageRequestParameters);
    const backendUrl = `/${SHOPIFY_APP_PROXY_PATH}/${backendPath}`;

    fetch(backendUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPageRequestParameters),
        redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        if (htmlContentContainer.contentDocument) {
            // htmlContentContainer が iframe の場合はこちら
            htmlContentContainer.contentDocument.open();
            htmlContentContainer.contentDocument.write(result);
            htmlContentContainer.contentDocument.close();
        } else {
            htmlContentContainer.innerHTML = result;
        }
    })
    .catch(error => console.log('error', error));
};

/**
 * 現在のページのクエリパラメータを、オブジェクト形式で取得します。
 *
 * @returns {Object} クエリパラメータのオブジェクト
 * @example { coordinate_id: '1' }
 */
function getCurrentPageRequestParameters() {
    const parsedQueryParameters = {};

    const url = new URL(window.location.href);
    url.searchParams.forEach((value, key) => {
        if (!(key in parsedQueryParameters)) {
            parsedQueryParameters[key] = [];
        }
        parsedQueryParameters[key].push(value);
    });

    currentParameters = {};
    for (const key in parsedQueryParameters) {
        if (parsedQueryParameters[key].length === 1) {
            currentParameters[key] = parsedQueryParameters[key][0];
        } else {
            currentParameters[key] = parsedQueryParameters[key];
        }
    }
    return currentParameters;
}

/**
 * バックエンドのパス（URLの一部）を取得します。
 *
 * @param {Object} currentPageRequestParameters
 * @returns {string} バックエンドのパス
 */
function getBackendPath(currentPageRequestParameters) {
    // デバッグ用
    if ('debug_path' in currentPageRequestParameters) {
        return currentPageRequestParameters['debug_path'];
    }

    if (QUERY_PARAMETER_NAMES.COORDINATE_SLUG in currentPageRequestParameters) {
        return BACKEND_ENDPOINTS.COORDINATE_DETAIL.replace(
            PATH_PARAMETER_PLACEHOLDERS.COORDINATE_SLUG,
            currentPageRequestParameters[QUERY_PARAMETER_NAMES.COORDINATE_SLUG]
        );
    }

    return BACKEND_ENDPOINTS.COORDINATE_LIST;
}

console.log('content-loader.js loaded');
