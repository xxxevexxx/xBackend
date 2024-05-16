import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '@account/account.entity'
import { TGSorryService } from '@tgsorry/tgsorry.service'
import { TGSorryController } from '@tgsorry/tgsorry.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.AUTH_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [TGSorryController],
  providers: [TGSorryService],
})
export class TGSorryModule {}
