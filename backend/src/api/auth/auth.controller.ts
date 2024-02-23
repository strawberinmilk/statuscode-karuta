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

import { AdminAuthGuard } from './guard/admin.guard';
import { MemberAuthGuard } from './guard/member.guard';
import { LocalAuthGuard } from './guard/local.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(new ValidationPipe()) input: AuthSignUpRequest,
  ): Promise<string> {
    return this.authService.signUp(input);
  }

  // @UseGuards(MemberAuthGuard)
  // @UseGuards(AdminAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body(new ValidationPipe()) input: AuthLoginRequest,
    @Request() req: { user: PasswordOmitUser },
  ): Promise<JwtToken> {
    return this.authService.login(req.user);
  }
}
