/**
 * OGNE コーディネート情報
 */

import { OgneApiBaseResponse } from "./ogne-api-base-response";

type CoordinateImage = {
    mainSize: string;
    thumbnail: string;
    alternativeText: string;
}

/**
 * OGNE コーディネート情報
 */
export class OgneCoordinateElement {

    public totalArticleCount: number;
    public totalPageCount: number;

    public id: number;
    public slug: string;
    public title: string;
    public description: string;
    public mainCoordinateImageUrl: CoordinateImage;
    public coordinateImageUrls: Array<CoordinateImage>;

    /**
     *
     * @param responseJson
     */
    constructor(coordinateElementJsonObj: Record<string, any>) {
        this.totalArticleCount = coordinateElementJsonObj?.["X-WP-Total"] || 0;
        this.totalPageCount = coordinateElementJsonObj?.["X-WP-TotalPages"] || 0;

        this.id = coordinateElementJsonObj?.id || -1;
        this.slug = coordinateElementJsonObj?.slug || "";
        this.title = coordinateElementJsonObj?.title?.rendered || "";
        this.description = coordinateElementJsonObj?.content?.rendered || "";

        this.coordinateImageUrls = this.buildCoordinateImageUrls(coordinateElementJsonObj?.scms_coordinate_images || []);
        this.mainCoordinateImageUrl = (this.coordinateImageUrls.length > 0) ? this.coordinateImageUrls[0] : {
            mainSize: "",
            thumbnail: "",
            alternativeText: "",
        };

        // 外部のコードによって、このインスタンスが変更されることを予防します。
        Object.freeze(this);
    }

    protected buildCoordinateImageUrls(scms_coordinate_images: Array<Record<string, any>>): Array<CoordinateImage> {
        const coordinateImageUrls = scms_coordinate_images.map((scms_coordinate_image) => {
            return this.buildCoordinateImageUrl(scms_coordinate_image);
        });

        Object.freeze(coordinateImageUrls);
        return coordinateImageUrls;
    }

    protected buildCoordinateImageUrl(scms_coordinate_image: Record<string, any>): CoordinateImage {
        const coordinateImage = {
            mainSize: scms_coordinate_image?.main_size || "",
            thumbnail: scms_coordinate_image?.thumbnail || "",
            alternativeText: scms_coordinate_image?.alt || "",
        };

        Object.freeze(coordinateImage);
        return coordinateImage;
    }
}
