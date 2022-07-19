export default class APIResponse {
	success: boolean
	status: number
	errors: string[]
	response: any
	constructor(status: 200 | 400 | 404 = 400, errors: string[] = [], response: any = {}, success: boolean = false) {
		this.success = success
		this.status = status
		this.errors = []
		this.errors.push(...errors)
		this.response = response
	}
}

export interface UndefinedAPIResponse extends APIResponse {
	response: undefined
}

export interface NumericAPIResponse extends APIResponse {
	response: number
}
