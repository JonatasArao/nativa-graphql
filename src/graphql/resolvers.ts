import { PrismaClient } from '@prisma/client';
import { LineService } from '@/services/line.service'
import { ProductService } from '@/services/product.service'
import { ProductParent, ProductFilterInput } from '@/models/product.model'
import { LineFilterInput } from '@/models/line.model'
import { RegisterUserInput } from '@/models/user.model'
import { UserService } from '@/services/user.service';

const prisma = new PrismaClient();
const lineService = new LineService(prisma);
const productService = new ProductService(prisma);
const userService = new UserService(prisma);

export const resolvers = {
  Query: {
    product: async (_: any, args: { id: string }) => {
      return await productService.getProduct(args.id);
    },
    products: async (_: any, args: { filter?: ProductFilterInput }) => {
      return await productService.getProducts(args.filter || {});
    },
    line: async (_: any, args: { id: string }) => {
      return await lineService.getLine(args.id);
    },
    lines: async (_: any, args: { filter?: LineFilterInput }) => {
      return await lineService.getLines(args.filter || {});
    }
  },
  Mutation : {
    registerUser: async (_: any, args: RegisterUserInput) => {
      const { name, email, password } = args;
      return await userService.registerUser(name, email, password);
    },
  },
  Product: {
    line: async (parent: ProductParent) => {
      return await lineService.getLine(parent.lineId);
    },
  },
};