/**
 * OGNE API レスポンスの基底クラス
 */

export type WrappedOgneApiResponse = {
    [key: symbol]: any;
}

export class OgneApiBaseResponse {
    private static API_RESPONSE_KEY: symbol = Symbol("OgneApiBaseResponse_WRAPPED_API_RESPONSE");

    protected apiResponseJsonObject: any;

    constructor(wrappedApiResponse: WrappedOgneApiResponse) {
        this.apiResponseJsonObject = wrappedApiResponse[OgneApiBaseResponse.API_RESPONSE_KEY];
    }

    static getWrappedApiResponse(responseBody: any): WrappedOgneApiResponse {
        return {
            [this.API_RESPONSE_KEY]: responseBody
        }
    }
}
