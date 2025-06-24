import products from '@/data/productList.json';
import lines from '@/data/lineList.json';

interface ProductParent {
  lineId: string;
}

export const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => {
      return products.find(p => p.id === args.id) || null;
    },
    productsPerLine: (_: any, args: { linhaId: string }) => {
      return products.filter(p => p.lineId === args.linhaId);
    },
  },
  Product: {
    line: (parent: ProductParent) => {
      return lines.find(l => l.id === parent.lineId) || null;
    },
  },
};