import { RegisterUserInput } from '@/models/user.model';
import { PrismaClient, Prisma } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(userData: RegisterUserInput): Promise<any> {
    return await this.prisma.user.create({
      data: userData,
    });
  }
}
