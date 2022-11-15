import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from "../user/schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
  }

  logger = new Logger("authService");

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.log('2');
    const user = await this.userModel.findOne({
      username: username,
      password: password
    });
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { username, _id } = user;
      // this.logger.log(username + _id + "PASSWORD");
      return user;
    }
    return null;
  }

  async login({ user: { username, _id } }) {
    this.logger.log('5');
    const payload = { username: username, sub: _id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
