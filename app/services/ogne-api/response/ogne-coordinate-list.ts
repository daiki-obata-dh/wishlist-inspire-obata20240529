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

    constructor(wrappedApiResponse: WrappedOgneApiResponse) {
        super(wrappedApiResponse);

        if (!Array.isArray(this.apiResponseJsonObject)) {
            throw new Error("The argument must be an array.");
        }

        this.elements = this.buildElements(this.apiResponseJsonObject);

        let totalArticleCount = 0;
        let totalPageCount = 0;
        if (this.elements.length > 0) {
            const headCoordinateElement = this.elements[0];
            totalArticleCount = headCoordinateElement.totalArticleCount;
            totalPageCount = headCoordinateElement.totalPageCount;
        }
        this.totalArticleCount = totalArticleCount;
        this.totalPageCount = totalPageCount;

        Object.freeze(this);
    }

    protected buildElements(coordinateInfoElements: Array<Record<string, any>>): Array<OgneCoordinateElement> {
        const elements = coordinateInfoElements.map((coordinateElement) => {
            return new OgneCoordinateElement(coordinateElement);
        });

        Object.freeze(elements);
        return elements;
    }
}
