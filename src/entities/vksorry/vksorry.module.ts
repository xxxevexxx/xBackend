import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Account } from '@account/account.entity'
import { VKSorryService } from '@vksorry/vksorry.service'
import { VKSorryController } from '@vksorry/vksorry.controller'


@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({
      secret: process.env.AUTH_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [VKSorryController],
  providers: [VKSorryService],
})
export class VKSorryModule {}
