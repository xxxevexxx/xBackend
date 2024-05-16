import { IsString, IsInt, IsISO8601, MinLength, MaxLength, Matches, IsOptional } from 'class-validator'


export class AccountDto {

    @IsInt()
    id: number | null

    @IsInt()
    @MinLength(1)
    @MaxLength(1)
    rank: number | null

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    login: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    nickname: string | null

    @IsString()
    @MinLength(2)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    firstName: string | null

    @IsString()
    @MinLength(2)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    lastName: string | null

    @IsString()
    @MaxLength(128)
    status: string | null

    @IsString()
    avatar: string | null

    @IsInt()
    telegram: number | null

    @IsInt()
    vkontakte: number | null

    @IsISO8601()
    createdAt: Date | null
}


export class getAccountDto {
    @IsInt()
    id: number | null
}

export class tokenAccountDto {
    @IsInt()
    id: number

    @IsString()
    login: string

    @IsString()
    password: string
}

export class loginAccountDto {

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    login: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string
}
export class checkAccountDto {
    @IsString()
    token: string
}
export class createAccountDto {

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    login: string

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string
}

export class updateAccountDto {

    @IsInt()
    id: number | null

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(255)
    password: string | null

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    nickname: string | null

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    firstName: string | null

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(16)
    @Matches(/^[a-zA-Z0-9_-]+$/)
    lastName: string | null

    @IsOptional()
    @IsString()
    @MaxLength(128)
    status: string | null

    @IsOptional()
    @IsString()
    avatar: string | null

    @IsOptional()
    @IsInt()
    google: number | null

    @IsOptional()
    @IsInt()
    telegram: number | null

    @IsOptional()
    @IsInt()
    vkontakte: number | null
}

export class deleteAccountDto {
    @IsInt()
    id: number | null
}