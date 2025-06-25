import { LineService } from '@/services/line.service'
import { ProductService } from '@/services/product.service'

interface ProductParent {
  lineId: string;
}

export const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => {
      return ProductService.getById(args.id);
    },
    products: (_: any, args: { lineId: string }) => {
      return ProductService.getByLine(args.lineId);
    },
    productsSearch: (_: any, args: { query: string }) => {
      return ProductService.searchQuery(args.query);
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