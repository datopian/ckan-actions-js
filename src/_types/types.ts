type optionsType = {
    apiKey?: string;
    headers?: { [key: string]: string };
};

enum CkanErrorType {
    ValidationError = "Validation Error",
}

type CkanErrorBody = {
    help: string;
    error: {
        [field: string]: string[] | string;
        __type: CkanErrorType;
    };
};

export { optionsType, CkanErrorBody, CkanErrorType }