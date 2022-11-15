import {
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  Logger,
  Post, Put, Req, UseGuards
} from "@nestjs/common";
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtRequest } from "../interfaces";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService) {}

  @Put('verify')
  @UseGuards(JwtAuthGuard)
  async ver(@Req() req: JwtRequest) {

  }

  @Post('check')
  checkUsername(@Body() username: { username: string }) {
    this.logger.log(username);
    return this.userService.checkUsername(username).then((r) => {
      if (r === '403') {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'such user exists',
        });
      }
      if (r === '200') {
        return { status: HttpStatus.OK };
      }
    });
  }

  @Post('register')
  createUser(@Body() createUserDto: UserDto) {
    this.logger.log(createUserDto);
    return this.userService.createUser(createUserDto).then((r) => {
      if (r === '403') {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'such user exists',
        });
      }
      if (r === '201') {
        return { status: HttpStatus.CREATED };
      }
    });
  }
}
