import { Controller, Post, Get, Body, Param, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from '@guard/jwt.guard';
import { VKSorryService } from '@vksorry/vksorry.service'
import { AuthAccountDto, UpdateAccountDto, ActionAccountDto } from '@vksorry/dto/vksorry.dto'

@Controller('api/vksorry')
export class VKSorryController {
  constructor(private readonly vksorryService: VKSorryService) {}

  @UseGuards(JwtGuard)
  @Post("/auth")
  async authAccount(@Body() authData: AuthAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.vksorryService.authAccount(authData, req.user.id))
  }

  @UseGuards(JwtGuard)
  @Get("/account/:user_id")
  async getAccount(@Res() res: Response, @Req() req, @Param('user_id') user_id: number) {
    return res.send(await this.vksorryService.getAccount(req.user, user_id))
  }

  @UseGuards(JwtGuard)
  @Get("/accounts/:owner_id")
  async getAccounts(@Res() res: Response, @Req() req, @Param('owner_id') owner_id: number) {
    return res.send(await this.vksorryService.getAccounts(req.user, owner_id))
  }

  @UseGuards(JwtGuard)
  @Post("/update")
  async updateAccount(@Body() updateData: UpdateAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.vksorryService.updateAccount(req.user, updateData))
  }

  @UseGuards(JwtGuard)
  @Post("/action")
  async actionAccount(@Body() updateData: ActionAccountDto, @Res() res: Response, @Req() req) {
    return res.send(await this.vksorryService.actionAccount(req.user, updateData))
  }
}