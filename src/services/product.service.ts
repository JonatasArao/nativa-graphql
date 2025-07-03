import { Product, ProductFilterInput } from "@/models/product.model";
import { ProductRepository } from '@/repositories/product.repository';
import { normalizeString } from "@/utils/string";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async getProduct(id: string) : Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product ? {
      ...product,
      keyIngredients: product.keyIngredients ? JSON.parse(product.keyIngredients) : [],
    } : null;
  }

  async getProducts(filter?: ProductFilterInput) : Promise<Product[] | null> {
    const { lineId, query } = filter || {};
    const normalizedQuery = normalizeString(query || '');

    const products = await this.productRepository.findMany({
      lineId,
      query: normalizedQuery,
    });

    return products ? products.map(product => ({
      ...product,
      keyIngredients: product.keyIngredients ? JSON.parse(product.keyIngredients) : [],
    })) : null;
  }
}
