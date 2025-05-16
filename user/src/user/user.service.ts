import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    return this.userModel.create({ username, email });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.find({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.userModel.deleteOne({ id });
  }
}
