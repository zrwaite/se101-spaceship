export default class Response {
    success;
    status;
    errors;
    response;
    constructor(status=400, errors=[], response={}, success=false) {
        this.success = success;
        this.status = status;
        this.errors = [];
        this.errors.push(...errors);
        this.response = response;
    }
}