/**
 * OGNE API レスポンスの基底クラス
 */

import { Record } from "@prisma/client/runtime/library";

export abstract class OgneApiBaseParameters {

  protected requestBodyJson: Object;
  protected ogneApiParameters: Record<string, any>;

  constructor(requestBodyJson: Object) {
    this.requestBodyJson = requestBodyJson;
    this.ogneApiParameters = this.convertToOgneApiParameters(requestBodyJson);
  }

  public asURLSearchParams(): URLSearchParams {
    const urlQuery = new URLSearchParams();
    const validParameters = this.filterValidParameters(this.ogneApiParameters);

    for (const key in validParameters) {
      urlQuery.append(key, validParameters[key]);
    }
    return urlQuery;

  };

  protected filterValidParameters(ogneApiParameters: Record<string, any>): Record<string, any> {
    const validParameters: Record<string, any> = {};
    for (const key in ogneApiParameters) {
      if (ogneApiParameters[key] !== null) {
        validParameters[key] = ogneApiParameters[key];
      }
    }
    return validParameters
  }

  protected abstract convertToOgneApiParameters(requestBodyJson: Object): Record<string, any>;
}
