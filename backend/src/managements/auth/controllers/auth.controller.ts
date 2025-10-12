import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestManagementData, RegisterRequestManagementData } from 'src/managements/users/interfaces/User_Management.interface';
import { LoggerService } from 'src/utils/log_service.service';
import { NextFunction, Response } from 'express';
import { VerifyLoginMiddleware } from 'src/middlewares/verify_user.middleware';
import { JwtAuthGuard } from '../guards/auth.guard';


@Controller({
  path: 'auth',
  version:'1'
})
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly logger:LoggerService
  ) {
    
  }

   @Post('register')
    async handleRegister(
    @Body() registerRequest: RegisterRequestManagementData,
    @Res() res: any):Promise<any> { 
      await this.authService.register(registerRequest)
      return res.status(HttpStatus.OK).json({
        message:'success'
    })
  }
  
  @Post('login')
  async handleLogin(
    @Body() loginRequest: LoginRequestManagementData,
    @Res() res:Response
  ) {
    const data = await this.authService.login(loginRequest)
    res.cookie('access_Token', data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 15,
      signed:false
    })
    return res.status(HttpStatus.OK).json({
      message: 'success',
      data:data.user
    })
  }

  @Get('verify_login')
  @UseGuards(JwtAuthGuard)
  async getVerifyLogin(
    @Req() req: any,
  ): Promise<any>{
    try {
    return {
      message: 'success',
      data: req.user}
    } catch (error) {
      throw error
    }
  }


  @Get('logout')
  async logOut(@Res() res: any) {
    res.cookie('access_Token',{ expires: new Date(Date.now())})
    res.status(HttpStatus.OK).json({
      message:'success'
    })
  }
  
}
