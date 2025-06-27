import { PrismaClient } from '@prisma/client';
import { LineService } from '@/services/line.service'
import { ProductService } from '@/services/product.service'
import { ProductParent, ProductFilterInput } from '@/models/product.model'
import { LineFilterInput } from '@/models/line.model'

const prisma = new PrismaClient();
const lineService = new LineService(prisma);
const productService = new ProductService(prisma);

export const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => {
      return productService.getProduct(args.id);
    },
    products: (_: any, args: { filter?: ProductFilterInput }) => {
      return productService.getProducts(args.filter || {});
    },
    line: async (_: any, args: { id: string }) => {
      return await lineService.getLine(args.id);
    },
    lines: async (_: any, args: { filter?: LineFilterInput }) => {
      return await lineService.getLines(args.filter || {});
    }
  },
  Product: {
    line: (parent: ProductParent) => {
      return lineService.getLine(parent.lineId);
    },
  },
};