import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupSchema } from './schemaas/index';
import { LoginDTO, SignupDTO } from './dto/index';
import { date } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //api sign up 
  @Post("signup")
  async signup(@Body() 
  signupDTO:SignupDTO,
)
  
  {
    const createdUser = await this.authService.signupService(signupDTO);
    return {message:"user created successfully",data:createdUser}
  }

  @Post("login")
  async login(@Body() loginDTO:LoginDTO)
  {
    const token = await this.authService.login(loginDTO);
    return {message:"done",token}
  }
 
}
