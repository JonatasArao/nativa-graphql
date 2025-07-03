import { PrismaClient } from '@prisma/client';
import { ProductFilterInput } from "@/models/product.model";

export class ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findById(id: string) : Promise<any | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product;
  }

  async findMany(filter?: ProductFilterInput) : Promise<any[] | null> {
    const { lineId, query } = filter || {};

    const products = await this.prisma.product.findMany({
      where: {
        AND: [
          lineId ? { lineId: lineId } : {},
          query ? {
            OR: [
              {
                searchableText: {
                  contains: query,
                },
              },
              {
                line: {
                  searchableText: {
                    contains: query,
                  },
                },
              },
            ],
          } : {},
        ],
      },
    });
    return products;
  }
}
