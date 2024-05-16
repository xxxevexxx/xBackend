import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { Account } from '@account/account.entity'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import {
  createAccountDto,
  getAccountDto,
  loginAccountDto,
} from '@account/dto/account.dto'


const EXPIRE_TIME = 86400 * 1000


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly jwtService: JwtService
  ) {}

  async getAccount(user_id: number) {
    const user = await this.findById(user_id)
    const { password, ...result } = user
    return result
  }

  async authorizationAccount(loginAccount: loginAccountDto) {
    const user = await this.authenticationAccount(loginAccount);
    const payload = {
      id: user.id,
      username: user.login,
      sub: {
        rank: user.rank,
        balance: user.balance,
        nickname: user.nickname,
      },
    }
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.AUTH_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '30d',
          secret: process.env.AUTH_REFRESH_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    }
  }

  async authenticationAccount(loginAccount: loginAccountDto) {
    const user = await this.findByLogin(loginAccount.login);
    if (user && (await bcrypt.compare(loginAccount.password, user.password))) {
      const { password, ...result } = user
      return result
    }
    throw new UnauthorizedException("Incorrect login or password")
  }

  async registrationAccount(updateAccountDto: createAccountDto) {
    const existingAccount = await this.findByLogin(updateAccountDto.login)

    if (existingAccount) {
      throw new ConflictException("Account already")
    }
    const newAccount = this.accountRepository.create({
      ...updateAccountDto,
      password: await bcrypt.hash(updateAccountDto.password, 10)
    })
    await this.accountRepository.save(newAccount)
    const { password, ...result } = newAccount
    return result
  }

  async refreshToken(user: any) {
    const payload = {
      id: user.id,
      username: user.username,
      sub: user.sub,
    }
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.AUTH_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '30d',
        secret: process.env.AUTH_REFRESH_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }
  }
  async findByLogin(login: string) {
    return await this.accountRepository.findOne({ where: { login: login }})
  }
  async findById(id: number) {
    return await this.accountRepository.findOne({ where: { id: id }})
  }
}
