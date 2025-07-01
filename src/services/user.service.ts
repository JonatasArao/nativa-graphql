import { Prisma, PrismaClient } from '@prisma/client';
import { User } from "@/models/user.model";

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async registerUser(name: string, email: string): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: { name, email },
      });
      return newUser;

    } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new Error('This email address is already in use.');
          case 'P2000':
            throw new Error('The provided name or email is too long.');
          case 'P2011':
              throw new Error('Name and email are required fields.');
          default:
            console.error(`A known Prisma error occurred: ${error.code}`, error);
            throw new Error('An error occurred while processing the data.');
        }
      }
      console.error('An unknown error occurred:', error);
      throw error;
    }
  }
}