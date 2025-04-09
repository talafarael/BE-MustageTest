import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user) {
      const verifyPassword = await bcrypt.compareSync(pass, user.password);

      if (!verifyPassword) {
        return null
      }
      return user
    }
    return null;
  }
  async registration(data: RegistrationDto) {
    try {
      const user = await this.userService.findOne(data.email)
      if (user) {
        throw new NotFoundException('this name was used');
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const newUser = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword
        }
      })
      return newUser
    } catch (e) {
      console.error(e)
      throw new Error('Registration failed');
    }

  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
