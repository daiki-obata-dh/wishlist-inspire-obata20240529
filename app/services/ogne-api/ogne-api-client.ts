/**
 * OGNE API Client
 */

import { OgneApiSettings } from "./ogne-api-settings";
import { OgneCoordinateList } from "./response/ogne-coordinate-list";
import { OgneCoordinateListParameters } from "./parameters/ogne-coordinate-list-parameters";
import { OgneCoordinateDetailParameters } from "./parameters/ogne-coordinate-detail-parameters";
import { OgneApiBaseParameters } from "./parameters/ogne-api-base-parameters";
import { OgneApiBaseResponse, WrappedOgneApiResponse } from "./response/ogne-api-base-response";


type RequestOptions = {
    url: string;
    method: string;
    body: string | null;
    headers: Record<string, string>;
}

type RequestCredentials = {
    headers: Record<string, string>;
}


export class OgneApiClient {
    async getCoordinateList(parameters: OgneCoordinateListParameters | OgneCoordinateDetailParameters): Promise<OgneCoordinateList> {
        const response = await this.request(OgneApiSettings.getCoordinateUrl(), "GET", parameters);
        return new OgneCoordinateList(response)
        /*  => レスポンスの例
            [
                {                           # コーディネート情報1つ分を表現する箱
                    "id": 10,
                    "X-WP-Total": 10,           # 総ページ数。全部の「コーディネート情報」要素に同じ値で格納されている模様。
                    "X-WP-TotalPages": 2,
                    "date": "2024-05-30T11:32:00",
                    "slug": "b719192fd04346989378d5b8242f72ea",
                    "status": "publish",
                    "type": "coordinate",
                    "title": {
                        "rendered": "確認"
                    },
                    "content": {
                        "rendered": "コーデ説明"
                    },
                    "author": 1,
                    "author_nickname": "管理者01",
                    "author_height": "156cm",
                    "author_avatar_image": "https://coordinate.stg.store-image.jp/demo/media/bb99a552207340349aaaa24e4bd82f39.jpg",
                    "author_brand_name": "ブランド2",
                    "author_store_name": "店舗1",
                    "scms_blog_id": 3,
                    "scms_taxonomy": {
                        "tag": [
                            {
                                "term_id": 1,
                                "name": "アパレル",
                                "slug": "00001",
                                "parent": "0"
                            },
                            {
                                "term_id": 3,
                                "name": "ダウン/中綿",
                                "slug": "00003",
                                "parent": "1"
                            },
                            {
                                "term_id": 5,
                                "name": "シャツ/ポロシャツ",
                                "slug": "00005",
                                "parent": "1"
                            },
                            {
                                "term_id": 9,
                                "name": "アパレルアクセサリー",
                                "slug": "00009",
                                "parent": "0"
                            },
                            {
                                "term_id": 10,
                                "name": "ゲイター",
                                "slug": "00010",
                                "parent": "9"
                            },
                            {
                                "term_id": 11,
                                "name": "帽子/キャップ",
                                "slug": "00011",
                                "parent": "9"
                            },
                            {
                                "term_id": 12,
                                "name": "マフラー",
                                "slug": "00012",
                                "parent": "9"
                            },
                            {
                                "term_id": 13,
                                "name": "グローブ",
                                "slug": "00013",
                                "parent": "9"
                            }
                        ]
                    },
                    "scms_coordinate_images": [
                        {
                            "main_size": [
                                "https://coordinate.stg.store-image.jp/demo/media/4ed3dcfaf5cd47c6aece41cd24b435ce.jpg"
                            ],
                            "id": 47,
                            "alt": "",
                            "thumbnail": ""
                        },
                        {
                            "main_size": [
                                "https://coordinate.stg.store-image.jp/demo/media/41866416214b40a5858cbc421bdef707.jpg"
                            ],
                            "id": 48,
                            "alt": "",
                            "thumbnail": ""
                        },
                        {
                            "main_size": [
                                "https://coordinate.stg.store-image.jp/demo/media/88c7ef5a6a9e4452837ef6d9648c82f9.mp4"
                            ],
                            "id": 50,
                            "alt": "",
                            "thumbnail": "https://coordinate.stg.store-image.jp/demo/media/cbe77d468682422f91d5a771bd81d307.jpg"
                        }
                    ],
                    "related_sns": {
                        "brand_sns": {
                            "instagram": {
                                "url": ""
                            }
                        },
                        "personal_sns": {
                            "instagram": {
                                "url": ""
                            }
                        }
                    },
                    "coordinate_good_job_count": 0,
                    "reject_comment": "",
                    "scms_products": [],
                    "scms_store": [
                        {
                            "id": 5,
                            "name": "店舗2",
                            "slug": "0005"
                        }
                    ],
                    "reject_fields": [],
                    "view_count": 0,
                    "view_count_updated_at": "2024-06-24T11:46:07"
                },
            ]
        */
    }

    protected async request(path: string, method: string, parameters: OgneApiBaseParameters): Promise<WrappedOgneApiResponse> {
        const requestOptions = this.buildRequestOption(path, method, parameters);

        const response = await fetch(requestOptions.url, {
            method: requestOptions.method,
            body: requestOptions.body,
            headers: requestOptions.headers,
        });
        const jsonResponse = await response.json();

        const wrappedOgneApiResponse = OgneApiBaseResponse.getWrappedApiResponse(jsonResponse);

        return wrappedOgneApiResponse
    }

    protected buildRequestOption(
        path: string,
        method: string,
        parameters: OgneApiBaseParameters,
    ): RequestOptions {
        const requestCredentials = this.buildCredentials();

        if (method === "GET") {
            return {
                url: path + "?" + parameters.asURLSearchParams(),
                method: method,
                body: null,
                headers: requestCredentials.headers,
            };
        }

        throw new Error("Unsupported method.");
    }

    protected buildCredentials(): RequestCredentials {
        return {
            headers: {
                "Cookie": `sessionid=${OgneApiSettings.SESSION_ID}`,
                "X-Coord-Server-Site-Code": OgneApiSettings.SITE_CODE,
            },
        };
    }
}
