import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.validateUser(
      signInDto.username,
      signInDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('my-profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
