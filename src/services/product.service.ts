import { PrismaClient } from '@prisma/client';
import { Product, ProductFilterInput } from "@/models/product.model";
import { normalizeString } from "@/utils/string";

export class ProductService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getProduct(id: string) : Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product ? {
      ...product,
      keyIngredients: product.keyIngredients ? JSON.parse(product.keyIngredients) : [],
    } : null;
  }

  async getProducts(filter?: ProductFilterInput) : Promise<Product[] | null> {
    const { lineId, query } = filter || {};
    const normalizedQuery = normalizeString(query || '');

    const products = await this.prisma.product.findMany({
      where: {
        AND: [
          lineId ? { lineId: lineId } : {},
          query ? {
            OR: [
              {
                searchableText: {
                  contains: normalizedQuery,
                },
              },
              {
                line: {
                  searchableText: {
                    contains: normalizedQuery,
                  },
                },
              },
            ],
          } : {},
        ],
      },
    });

    return products.map(product => ({
      ...product,
      keyIngredients: product.keyIngredients ? JSON.parse(product.keyIngredients) : [],
    }));
  }
}