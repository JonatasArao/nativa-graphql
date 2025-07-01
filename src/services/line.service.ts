import { PrismaClient } from '@prisma/client';
import { Line, LineFilterInput } from "@/models/line.model";
import { normalizeString } from '@/utils/string';

export class LineService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getLine(id : string): Promise<Line | null> {
    return await this.prisma.line.findUnique({
      where: { id },
    });
  }

  async getLines(filter?: LineFilterInput): Promise<Line[] | null> {
    const { query } = filter || {};
    const normalizedQuery = normalizeString(query || '');

    return await this.prisma.line.findMany({
      where: query
        ? {
            searchableText: {
              contains: normalizedQuery,
            },
          }
        : {},
    });
  }
}