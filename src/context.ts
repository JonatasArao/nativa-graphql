import { db } from './lib/prisma';
import { LineRepository } from '@/repositories/line.repository';
import { ProductRepository } from '@/repositories/product.repository';
import { UserRepository } from '@/repositories/user.repository';
import { LineService } from '@/services/line.service';
import { ProductService } from '@/services/product.service';
import { UserService } from '@/services/user.service';

const lineRepository = new LineRepository(db);
const productRepository = new ProductRepository(db);
const userRepository = new UserRepository(db);

const lineService = new LineService(lineRepository);
const productService = new ProductService(productRepository);
const userService = new UserService(userRepository);

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
