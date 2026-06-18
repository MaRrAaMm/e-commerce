import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/DB/Models/user/user.repository';
import { UserModel } from 'src/DB/Models/user/user.model';
import { TokenService } from 'src/common/index';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports:[UserModel],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,TokenService,JwtService],
  exports:[UserRepository,TokenService,JwtService]
})
export class AuthModule {}
