import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from './config.module'
import { AppController } from './app.controller'
import { DataBaseModule } from '@database/database.module'
import { AccountModule } from '@account/account.module'
import { TGSorryModule } from '@tgsorry/tgsorry.module'
import { VKSorryModule } from '@vksorry/vksorry.module'


@Module({
  imports: [
    ConfigModule,
    DataBaseModule,
    AccountModule,
    TGSorryModule,
    VKSorryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
