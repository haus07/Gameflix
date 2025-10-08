import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterRequestManagementData } from 'src/managements/users/interfaces/User_Management.interface';
import { LoggerService } from 'src/utils/log_service.service';


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
}
