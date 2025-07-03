import { PrismaClient } from '@prisma/client';
import { LineFilterInput } from "@/models/line.model";

export class LineRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id : string): Promise<any | null> {
    return await this.prisma.line.findUnique({
      where: { id },
    });
  }

  async findMany(filter?: LineFilterInput): Promise<any[] | null> {
    const { query } = filter || {};

    return await this.prisma.line.findMany({
      where: query
        ? {
            searchableText: {
              contains: query,
            },
          }
        : {},
    });
  }
}
