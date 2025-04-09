import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async findOne(email: string): Promise<any | undefined> {
    try {
      return await this.prisma.user.findFirst({ where: { email: email } })
    } catch (e) {
      console.error('Error in findOne:', e);
      throw new Error('Failed to fetch user by name');
    }
  }

}
