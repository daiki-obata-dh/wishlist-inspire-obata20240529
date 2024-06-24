/**
 * OGNE コーディネート情報
 */

import { OgneApiBaseResponse, WrappedOgneApiResponse } from "./ogne-api-base-response";
import { OgneCoordinateElement } from "./ogne-coordinate-element";

/**
 * OGNE コーディネート情報一覧
 */
export class OgneCoordinateList extends OgneApiBaseResponse {

    public totalArticleCount: number;
    public totalPageCount: number;

    public elements: Array<OgneCoordinateElement>;
    public headElement: OgneCoordinateElement | null = null;


    constructor(wrappedApiResponse: WrappedOgneApiResponse) {
        super(wrappedApiResponse);

        if (!Array.isArray(this.apiResponseJsonObject)) {
            throw new Error("The argument must be an array.");
        }

        this.elements = this.convertElements(this.apiResponseJsonObject);

        this.headElement = (this.elements.length > 0) ? this.elements[0] : null;
        this.totalArticleCount = this.headElement?.totalArticleCount || 0;
        this.totalPageCount = this.headElement?.totalPageCount || 0;

        Object.freeze(this);
    }

    /**
     * OGNEのAPIレスポンスを、このアプリ用のコーディネート情報一覧データに変換します。
     *
     * @param ogne_api_coordinate_info OGNE APIのコーディネート情報一覧データ
     * @returns {Array<OgneCoordinateElement>} コーディネート情報一覧データ
     */
    protected convertElements(ogne_api_coordinate_info: Array<Record<string, any>>): Array<OgneCoordinateElement> {
        const elements = ogne_api_coordinate_info.map((coordinateElement) => {
            return new OgneCoordinateElement(coordinateElement);
        });

        Object.freeze(elements);
        return elements;
    }
}
