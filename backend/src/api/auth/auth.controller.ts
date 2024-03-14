import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthSignUpRequest,
  PasswordOmitUser,
  ActiveRequest,
} from './dto/auth.dto';
import { JwtToken } from './dto/auth.type';
import { LoginAuthGuard } from 'src/guards/guard/login.guard';
import { UserRemovePassword } from 'src/db/user/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(new ValidationPipe()) input: AuthSignUpRequest,
  ): Promise<string> {
    return this.authService.signUp(input);
  }

  @Post('login')
  @UseGuards(LoginAuthGuard)
  async login(
    @Body(new ValidationPipe()) input: AuthLoginRequest,
    @Request() req: { user: PasswordOmitUser },
  ): Promise<JwtToken> {
    return this.authService.login(req.user);
  }

  @Post('active')
  async active(
    @Body(new ValidationPipe()) input: ActiveRequest,
  ): Promise<UserRemovePassword> {
    return this.authService.active(input);
  }
}
