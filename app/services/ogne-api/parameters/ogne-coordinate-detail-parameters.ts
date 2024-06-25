/**
 * OGNE コーディネート情報
 */

import { OgneApiBaseParameters } from "./ogne-api-base-parameters";

/**
 * OGNE 「コーディネート情報取得」API（1件取得用途）のリクエストパラメータ
 */
export class OgneCoordinateDetailParameters extends OgneApiBaseParameters {

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
            slug: null,
        };

        // リクエストボディのキー名をOGNE APIのリクエストパラメータのキー名に変換する
        parameters.slug = requestBodyJson.slug || parameters.slug;

        return parameters;
    }
}
