import { Prisma, PrismaClient } from '@prisma/client';
import { User, Role } from "@/models/user.model";
import bcrypt from 'bcrypt';

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async registerUser(name: string, email: string, password: string): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const prismaUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
      });
      const newUser: User = {
        id: prismaUser.id,
        email: prismaUser.email,
        name: prismaUser.name,
        role: prismaUser.role as Role,
      };
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