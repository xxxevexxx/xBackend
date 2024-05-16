import { Controller, Post, Get, Body, Param, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from '@guard/jwt.guard';
import { TGSorryService } from '@tgsorry/tgsorry.service'
import { AuthAccountDto, UpdateAccountDto, ActionAccountDto } from '@tgsorry/dto/tgsorry.dto'

@Controller('tgsorry')
export class TGSorryController {
  constructor(private readonly tgsorryService: TGSorryService) {}

  @UseGuards(JwtGuard)
  @Post("/auth")
  async authAccount(@Body() authData: AuthAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.tgsorryService.authAccount(authData, req.user.id))
  }

  @UseGuards(JwtGuard)
  @Get("/account/:user_id")
  async getAccount(@Res() res: Response, @Req() req, @Param('user_id') user_id: number) {
    return res.send(await this.tgsorryService.getAccount(req.user, user_id))
  }

  @UseGuards(JwtGuard)
  @Get("/accounts/:owner_id")
  async getAccounts(@Res() res: Response, @Req() req, @Param('owner_id') owner_id: number) {
    return res.send(await this.tgsorryService.getAccounts(req.user, owner_id))
  }

  @UseGuards(JwtGuard)
  @Post("/update")
  async updateAccount(@Body() updateData: UpdateAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.tgsorryService.updateAccount(req.user, updateData))
  }

  @UseGuards(JwtGuard)
  @Post("/action")
  async actionAccount(@Body() updateData: ActionAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.tgsorryService.actionAccount(req.user, updateData))
  }
}