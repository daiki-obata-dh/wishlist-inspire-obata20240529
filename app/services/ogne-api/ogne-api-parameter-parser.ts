/**
 * OGNE API Client
 */

import { OgneApiSettings } from "./ogne-api-settings";
import { OgneCoordinateListParameters } from "./parameters/ogne-coordinate-list-parameters";

/**
 * ブラウザからバックエンド（このWebアプリ）に送信されるパラメータを、OGNE APIのリクエストパラメータに変換するクラス
 */
class OgneApiParameterParser {

    /**
     * コーディネート情報取得API（一覧取得用途）のリクエストパラメータに変換する
     *
     * @param requestBody {Object} ブラウザから送信されたリクエストボディ
     * @returns {OgneCoordinateListParameters} OGNE APIのリクエストパラメータ
     */
    static toCoordinateListParameters(requestBody: Object): OgneCoordinateListParameters {
        return new OgneCoordinateListParameters(requestBody)
    }
}
