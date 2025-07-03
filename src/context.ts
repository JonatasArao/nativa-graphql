import { db } from './lib/prisma';
import { LineService } from '@/services/line.service';
import { ProductService } from '@/services/product.service';
import { UserService } from '@/services/user.service';

const lineService = new LineService(db);
const productService = new ProductService(db);
const userService = new UserService(db);

export interface ApolloContext {
  lineService: LineService;
  productService: ProductService;
  userService: UserService;
}

export function createContext(): ApolloContext {
  return {
    lineService,
    productService,
    userService,
  };
}
