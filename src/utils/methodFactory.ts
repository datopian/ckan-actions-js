
import { CkanResponse } from "../@schema/ckan.schema";
import { CkanErrorBody, CkanErrorType } from "../_types/types";

class CkanRequestError extends Error implements CkanErrorBody {
  //  Default error fields returned by CKAN
  public help: string;
  public error: CkanErrorBody["error"];

  //  Custom helper properties

  constructor(ckanErrorBody: CkanErrorBody) {
    const error = ckanErrorBody.error;

    const errorFields = Object.keys(error).filter((f) => !f.startsWith("__"));
    let errorMessage = errorFields
      ? errorFields
        .map((f) => {
          const errorField = error[f];
          return typeof errorField !== "string"
            ? errorField?.join(" ")
            : errorField;
        })
        .join(" ")
      : "An error happened";
    if (error?.__type == CkanErrorType.ValidationError) {
      errorMessage = `Validation error: ${errorMessage}`;
    }

    super(errorMessage);
    this.name = "CkanRequestError";

    this.help = ckanErrorBody.help;
    this.error = error;
  }
}

export const methodFactory = (response: any): any => {
  return async <T>(): Promise<CkanResponse<T>> => {
    try {
      const data: CkanResponse<T> = await response.json() as CkanResponse<T>;
      if (response.ok) {
        return data;
      }
      else {
        throw data
      }
    } catch (e) {
      if (e) {
        throw new CkanRequestError(e as CkanErrorBody);
      }
      throw Error("An unknown error happened while reaching the server");
    }
  };
};
