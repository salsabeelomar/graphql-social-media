import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from 'sequelize';

import { Providers } from 'src/common/constant';
import { User } from 'src/modules/user/model/user.model';
import { CreateUserInput, LoginUserInput, UserType } from './dto';
import { UserService } from 'src/modules/user/user.service';
import { CheckExisting } from 'src/common/utils/checkExisting';
import { WinstonLogger } from 'src/common/logger/winston.logger';

@Injectable()
export class AuthService {
  private readonly Logger = new WinstonLogger();
  constructor(
    @Inject(Providers.AUTH_PROVIDER) private readonly userRepo: typeof User,
    @Inject(UserService) private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}
  generateToken(user: UserType) {
    const payload = {
      sub: user.id,
      user: {
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
      },
    };
    this.Logger.log(`Generate Token  for user id = ${user.id}`);

    return this.jwt.sign(payload);
  }

  async signUp(user: CreateUserInput, transaction: Transaction) {
    const getEmail = await this.userService.findByEmail(user.email);
    CheckExisting(!getEmail?.username, BadRequestException, 'This Email exist ');

    const hashedPass = bcrypt.hashSync(user.password, 10);

    const createdUser = await this.userRepo.create(
      {
        ...user,
        password: hashedPass,
      },
      { transaction },
    );
    this.Logger.log(`Create new User id = ${createdUser.id}`);
    const newUser: UserType = {
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      phoneNumber: createdUser.phoneNumber,
    };
    return { ...newUser, token: this.generateToken(newUser) };
  }

  async signIn(user: LoginUserInput, transaction: Transaction) {
    const getEmail = await this.userService.findByEmail(user.email);
    CheckExisting(
      getEmail?.username,
      BadRequestException,
      'This Email not exist ',
    );
    const getPass = await this.userService.findByEmail(user.email, [
      'password',
      'phoneNumber',
      'id',
    ]);
    const matchPass = bcrypt.compareSync(user.password, getPass.password);
    CheckExisting(
      matchPass,
      BadRequestException,
      'Email or Password not exists ',
    );
    this.Logger.log(`Signed User id = ${getPass.id}`);

    const newUser: UserType = {
      id: getPass.id,
      email: user.email,
      username: getEmail.username,
      phoneNumber: getPass.phoneNumber,
    };
    return {
      ...newUser,
      token: this.generateToken(newUser),
    };
  }
}
