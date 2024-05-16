import { IsString, IsInt } from 'class-validator'


export class AuthAccountDto {
	@IsInt()
	user: number | null
	@IsString()
	data: string | null
	@IsString()
	action: string | null
}

export class UpdateAccountDto {
	user_id: number
	username: string
	prefixes: {
		commands: string
		scripts: string
		repeats: string
	}
}

export class ActionAccountDto {
	user_id: number
	username: string
	action: string
}