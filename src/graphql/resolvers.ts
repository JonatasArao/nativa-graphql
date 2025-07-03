import { ApolloContext } from '@/context';
import { ProductParent, ProductFilterInput } from '@/models/product.model';
import { LineFilterInput } from '@/models/line.model';
import { RegisterUserInput } from '@/models/user.model';

export const resolvers = {
  Query: {
    product: async (_: any, args: { id: string }, context: ApolloContext) => {
      return await context.productService.getProduct(args.id);
    },
    products: async (_: any, args: { filter?: ProductFilterInput }, context: ApolloContext) => {
      return await context.productService.getProducts(args.filter || {});
    },
    line: async (_: any, args: { id: string }, context: ApolloContext) => {
      return await context.lineService.getLine(args.id);
    },
    lines: async (_: any, args: { filter?: LineFilterInput }, context: ApolloContext) => {
      return await context.lineService.getLines(args.filter || {});
    }
  },
  Mutation : {
    registerUser: async (_: any, args: RegisterUserInput, context: ApolloContext) => {
      const { name, email, password } = args;
      return await context.userService.registerUser(name, email, password);
    },
  },
  Product: {
    line: async (parent: ProductParent, _: any, context: ApolloContext) => {
      return await context.lineService.getLine(parent.lineId);
    },
  },
};
