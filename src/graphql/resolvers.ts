import { LineService } from '@/services/line.service'
import { ProductService } from '@/services/product.service'
import { ProductFilterInput } from '@/models/product.model'
import { LineFilterInput } from '@/models/line.model'

interface ProductParent {
  lineId: string;
}

export const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => {
      return ProductService.getProduct(args.id);
    },
    products: (_: any, args: { filter?: ProductFilterInput }) => {
      return ProductService.getProducts(args.filter || {});
    },
    line: (_: any, args: { id: string }) => {
      return LineService.getLine(args.id);
    },
    lines: (_: any, args: { filter?: LineFilterInput }) => {
      return LineService.getLines(args.filter || {});
    }
  },
  Product: {
    line: (parent: ProductParent) => {
      return LineService.getLine(parent.lineId);
    },
  },
};