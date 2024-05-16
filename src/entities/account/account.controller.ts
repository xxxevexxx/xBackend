import { Controller, Get, Post, Param, Body, Res, Req, UseGuards } from '@nestjs/common';
import { loginAccountDto, createAccountDto } from '@account/dto/account.dto';
import { Response, Request } from 'express';
import { JwtGuard } from '@guard/jwt.guard';
import { AccountService } from '@account/account.service';
import { RefreshJwtGuard } from '@guard/refresh.guard';


@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtGuard)
  @Get("/")
  async getAccount(
      @Res() res: Response,
      @Req() req
  ) {
    return res.send(await this.accountService.getAccount(req.user.id))
  }

  @Post("/authorization")
  async authorizationAccount(
      @Body() dataLogin: loginAccountDto,
      @Res() res: Response,
      @Req() req: Request,
  ) {
    return res.send(await this.accountService.authorizationAccount(dataLogin))
  }

  @Post("/authentication")
  async authenticationAccount(
    @Body() dataToken: any,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return res.send(await this.accountService.authenticationAccount(dataToken))
  }

  @Post("/registration")
  async registrationAccount(
      @Body() dataCreate: createAccountDto,
      @Res() res: Response,
      @Req() req: Request,
  ) {
    return res.send(await this.accountService.registrationAccount(dataCreate))
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(
    @Res() res: Response, 
    @Req() req
  ) {
    return res.send(await this.accountService.refreshToken(req.user))
  }
}
