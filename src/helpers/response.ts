export default class APIResponse {
    success:boolean;
    status:number;
    errors:string[];
    response:any;
    constructor(status:number=400, errors:string[]=[], response:any={}, success:boolean=false) {
        this.success = success;
        this.status = status;
        this.errors = [];
        this.errors.push(...errors);
        this.response = response;
    }
}