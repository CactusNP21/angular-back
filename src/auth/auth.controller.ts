import { Controller, Logger, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { JwtRequest } from "../interfaces";

@Controller("auth")
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {
  }

  logger = new Logger("authController");

  @Post("login")
  async login(@Req() req: JwtRequest) {
    this.logger.log("4");
    // @ts-ignore
    return this.authService.login(req.user);
  }


}
