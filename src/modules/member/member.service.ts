import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import MemberModel from './entities/member.model';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import { IRegisterRequestDto } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(MemberModel) private memberModel: typeof MemberModel,
  ) {}

  async isUser(userId): Promise<boolean> {
    const result = await this.memberModel.count({
      where: {
        userId,
      },
    });

    if (result > 0) {
      return true;
    }

    return false;
  }

  async getUser({ userId, password }): Promise<string | boolean> {
    const result = await this.isUser(userId);
    if (result) {
      const member = await this.memberModel.findOne({
        where: {
          userId,
        },
      });

      const newPassword = MemberService.encryptPassword(password, member.salt);
      if (newPassword !== member.password) {
        return false;
      }

      return MemberService.generateJwtToken(userId);
    }
    return false;
  }

  async register({
    userId,
    password,
    nickname,
  }: IRegisterRequestDto): Promise<boolean> {
    const salt: string = MemberService.createSalt();
    const encryptPassword: string = MemberService.encryptPassword(
      password,
      salt,
    );

    const result = await this.memberModel.create({
      userId,
      password: encryptPassword,
      salt,
      nickname,
    });

    if (result === null) {
      return false;
    }
    return true;
  }

  static generateJwtToken(userId: string): string {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
  }

  static createSalt() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  }

  static encryptPassword(
    password: string,
    salt: CryptoJS.lib.WordArray | string,
  ) {
    const newPassword = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 999,
    });
    return newPassword.toString();
  }
}
