import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async checkUsername(input: { username: string }): Promise<string> {
    if (await this.userModel.findOne({ username: input.username })) {
      return '403';
    }
    return '200';
  }

  async createUser(createUserDto: UserDto): Promise<string> {
    if (await this.userModel.findOne({ username: createUserDto.username })) {
      return '403';
    }
    await this.userModel.create(createUserDto);
    return '201';
  }
}
