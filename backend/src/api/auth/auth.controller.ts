import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthSignUpRequest,
  PasswordOmitUser,
} from './dto/auth.dto';
import { JwtToken } from './dto/auth.type';
import { LoginAuthGuard } from 'src/guards/guard/login.guard';
import { AdminAuthGuard } from 'src/guards/guard/admin.guard';
import { MemberAuthGuard } from 'src/guards/guard/member.guard';

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

  @Get('test/admin')
  @UseGuards(AdminAuthGuard)
  async adminTest(@Request() req: { user: PasswordOmitUser }) {
    console.log(req.user);
    return 'admin success';
  }

  @Get('test/member')
  @UseGuards(MemberAuthGuard)
  async partnerTest(@Request() req: { user: PasswordOmitUser }) {
    console.log(req.user);
    return 'member success';
  }
}
