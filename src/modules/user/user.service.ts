import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../auth/dto/input/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Providers } from 'src/common/constant';
import { User } from './model/user.model';
import { CheckExisting } from 'src/common/utils/checkExisting';

@Injectable()
export class UserService {
  constructor(
    @Inject(Providers.AUTH_PROVIDER) private readonly userRepo: typeof User,
  ) {}
  create(createUserInput: CreateUserInput) {
    return createUserInput;
  }

  async findByEmail(email: string, attributes?: string[]) {
    const att = attributes ? attributes.concat('username') : ['username'];
    const userEmail = await this.userRepo.findOne({
      attributes: att,
      where: { email },
    });
    return userEmail;
  }

  async findById(id: number) {
    const user = await this.userRepo.findByPk(id, {
      attributes: ['id', 'email', 'phoneNumber', 'username'],
    });

    CheckExisting(user, NotFoundException, 'User not Found');

    return {
      id: user.id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
