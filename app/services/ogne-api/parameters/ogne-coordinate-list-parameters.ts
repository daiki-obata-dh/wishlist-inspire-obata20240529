/**
 * OGNE コーディネート情報
 */

import { OgneApiBaseParameters } from "./ogne-api-base-parameters";

/**
 * OGNE 「コーディネート情報取得」API（一覧取得用途）のリクエストパラメータ
 */
export class OgneCoordinateListParameters extends OgneApiBaseParameters {

    /**
     * OGNE APIのリクエストパラメータに変換します。
     *
     * @param requestBodyJson
     * @returns {Record<string, any>} OGNE APIのリクエストパラメータ
     *
     * @see OgneApiBaseParameters.convertToOgneApiParameters
     */
    protected convertToOgneApiParameters(requestBodyJson: Record<string, string>): Record<string, any> {
        // キーがスネークケースなのは、OGNEのAPI仕様に依る
        const parameters: Record<string, any> = {
            page: 1,
            per_page: 5,
            status: null,
            shop_slug: null,
            // slug: null,  一覧取得のときは、このパラメータは利用しない
            author: null,
            store: null,
            tag: null,
            productcode: null,
            release_date_from: null,
            release_date_to: null,
        };

        // リクエストボディのキー名をOGNE APIのリクエストパラメータのキー名に変換する
        parameters.page = requestBodyJson.page ? parseInt(requestBodyJson.page) : parameters.page;

        return parameters;
    }
}
