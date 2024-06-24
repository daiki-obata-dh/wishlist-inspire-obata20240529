/**
 * Ogne API の設定
 */
export class OgneApiSettings {

    static readonly API_BASE_URL: string = process.env.OGNE_API_BASE_URL || "";

    static readonly SITE_CODE: string = process.env.OGNE_API_SITE_CODE || "";

    static readonly SESSION_ID: string = process.env.OGNE_API_SESSION_ID || "";

    static getCoordinateUrl() {
        return this.getApiUrl("/v1/coordinate");
    }

    protected static getApiUrl(path: string): string {
        const url = new URL(path, this.API_BASE_URL);
        return url.href;
    }
}
