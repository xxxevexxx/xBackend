import axios from 'axios'
import { Repository } from 'typeorm'
import { Account } from '@account/account.entity'
import { InjectRepository } from '@nestjs/typeorm'

import { Injectable, BadRequestException } from '@nestjs/common'
import { AuthAccountDto, UpdateAccountDto, ActionAccountDto } from '@tgsorry/dto/tgsorry.dto'


const TGSorryURL = "http://localhost:666"


@Injectable()
export class TGSorryService {

  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async authAccount(authData: AuthAccountDto, owner_id: number) {
    try {
      const response = await axios.post(`${TGSorryURL}/auth`, {...authData, owner_id})
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.description);
    }
  }

  async getAccount(user: any, user_id: number) {
    try {
      const response = await axios.get(`${TGSorryURL}/account/${user.id}/${user_id}`)
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.description);
    }
  }

  async getAccounts(user: any, owner_id: number) {
    try {
      user = await this.accountRepository.findOne({ where: { id: user.id }})
      const response = await axios.get(`${TGSorryURL}/accounts/${owner_id}/${user.limit}`);
      return response.data;
    } catch (error) {
      throw new BadRequestException(error.description);
    }
  }

  async updateAccount(user: any, updateData: UpdateAccountDto) {
    try {
      const response = await axios.post(`${TGSorryURL}/update`, {...updateData, owner_id: user.id})
      return response.data
    } catch (error) {
      throw new BadRequestException(error.description);
    }
  }

  async actionAccount(user: any, updateData: ActionAccountDto) {
    try {
      const response = await axios.post(`${TGSorryURL}/action`, {...updateData, owner_id: user.id})
      return response.data
    } catch (error) {
      throw new BadRequestException(error.description);
    }
  }
}