import productList from '@/data/productList.json';
import { Product } from "@/models/product.model";
import { LineService } from '@/services/line.service'
import { normalizeString } from "@/utils/string";

export class ProductService {
  private static lineMap = new Map(LineService.getAll().map(line => [line.id, line]));

  static getAll() : Product[] {
    return (productList as Product[])
      .filter((p): p is Product => p !== null);
  }

  static getByLine(lineId : string) : Product[] {
    const line = this.lineMap.get(lineId);
    if (!line) {
      throw new Error(`[ProductService] The line with ID ${lineId} was not found.`);
    }

    return (productList as Product[])
      .filter(p => p.lineId === lineId)
      .map(product => ({
        ...product,
        line
      }));
  }

  static getById(id : string) : Product | undefined {
    const product = (productList as Product[]).find(p => p.id === id);
    if (!product) {
      return undefined;
    }
    return product ?? undefined;
  }

  static searchQuery(query : string) : Product[] {
    const normalizedQuery = normalizeString(query);
    const matchingLineIds = new Set<string>(
      LineService.getAll()
      .filter(line => {
        const searchableLineText = [
          line.id,
          line.name,
          line.concept,
          line.description
        ].join(' ');
        return normalizeString(searchableLineText).includes(normalizedQuery);
      })
      .map(line => line.id)
    );
    const filteredRawProducts = (productList as Product[])
      .filter(product => {
        if (matchingLineIds.has(product.lineId)) {
            return true;
        }
        const searchableProductText = [
            product.id,
            product.name,
            product.variant,
            product.description,
            product.keyIngredients.join(' ')
        ].join(' ');
        return normalizeString(searchableProductText).includes(normalizedQuery);
    });
    return filteredRawProducts
        .filter((p): p is Product => p !== null);
  }
}