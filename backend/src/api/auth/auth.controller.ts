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
} from './dto/auth.dto';
import { JwtToken } from './dto/auth.type';
import { LoginAuthGuard } from 'src/guards/guard/login.guard';

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
}
