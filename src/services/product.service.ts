import productList from '@/data/productList.json';
import { Product, ProductFilterInput } from "@/models/product.model";
import { LineService } from '@/services/line.service';
import { normalizeString } from "@/utils/string";

export class ProductService {
  private static toSearchableText(product: Product): string {
      return [
        product.id,
        product.name,
        product.variant,
        product.description,
        product.keyIngredients.join(' ')
      ].join(' ');
  }

  private static filterByLineId(products : Product[], lineId : string) : Product[] {
    const line = LineService.getById(lineId)
    if (!line) {
      return [];
    }

    return (products)
      .filter(p => p.lineId === lineId)
  }

  private static filterByQueryText(products : Product[], query : string) : Product[] {
    const normalizedQuery = normalizeString(query);
    const matchingLineIds = new Set<string>(
      LineService.getLines({ query })
      .map(line => line.id)
    );
    const filteredProducts = products
      .filter(product => {
        if (matchingLineIds.has(product.lineId)) {
            return true;
        }
        const searchableProductText = this.toSearchableText(product);
        return normalizeString(searchableProductText).includes(normalizedQuery);
    });
    return filteredProducts;
  }

  private static getAll() : Product[] {
    return (productList as Product[])
      .filter((p): p is Product => p !== null);
  }

  static getById(id : string) : Product | undefined {
    return (productList as Product[]).find(p => p.id === id);
  }

  static getProducts(filter? : ProductFilterInput ) : Product[] {
    const { lineId, query } = filter || {};
    
    let products = this.getAll();
    if (lineId) {
      products = this.filterByLineId(products, lineId);
    }
    if (query) {
      products = this.filterByQueryText(products, query);
    }
    return products;
  }
}