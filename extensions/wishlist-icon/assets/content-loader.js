// TODO typescriptにする

// Shopify App Proxy のパス
const SHOPIFY_APP_PROXY_PATH = 'apps/wishlist';

// クエリパラメータの名前
const QUERY_PARAMETER_NAMES = {
    COORDINATE_ID: 'coordinate_id',
};

// URLのパスパラメータのプレースホルダー
const PATH_PARAMETER_PLACEHOLDERS = {
    COORDINATE_ID: '__ID__',
}

// OGNEコーディネートバックエンドのエンドポイント
const BACKEND_ENDPOINTS = {
    COORDINATE_LIST: 'coordinate/',
    COORDINATE_DETAIL: `coordinate/${PATH_PARAMETER_PLACEHOLDERS.COORDINATE_ID}`,
};


/**
 * aタグのリンククリックをトリガーに、画面を更新します。
 *
 * @param {Event} event
 * @returns {void}
 */
function loadHrefContentOnLinkClick(event) {
    event.preventDefault();

    if (!(event.target instanceof HTMLAnchorElement)) {
        return;
    }
    if (!(event.target.href)) {
        return;
    }

    const anchorElement = event.target;
    history.pushState(null, '', anchorElement.href);

    loadCurrentPageContent();
}

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
        htmlContentContainer.innerHTML = result;
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
    if (QUERY_PARAMETER_NAMES.COORDINATE_ID in currentPageRequestParameters) {
        return BACKEND_ENDPOINTS.COORDINATE_DETAIL.replace(
            PATH_PARAMETER_PLACEHOLDERS.COORDINATE_ID,
            currentPageRequestParameters[QUERY_PARAMETER_NAMES.COORDINATE_ID]
        );
    }

    return BACKEND_ENDPOINTS.COORDINATE_LIST;
}

console.log('content-loader.js loaded');
