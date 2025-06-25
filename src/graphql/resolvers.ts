import { LineService } from '@/services/line.service'
import { ProductService } from '@/services/product.service'
import { ProductFilterInput } from '@/models/productFilter.model'

interface ProductParent {
  lineId: string;
}

export const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => {
      return ProductService.getById(args.id);
    },
    products: (_: any, args: { filter: ProductFilterInput }) => {
      return ProductService.findProducts(args.filter);
    },
    line: (_: any, args: { id: string }) => {
      return LineService.getById(args.id);
    },
    lines: (_: any) => {
      return LineService.getAll();
    }
  },
  Product: {
    line: (parent: ProductParent) => {
      return LineService.getById(parent.lineId);
    },
  },
};