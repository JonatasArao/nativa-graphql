export interface Product {
	id: string;
	lineId: string | null;
	name: string;
	variant: string | null;
	keyIngredients: string[] | null;
	description: string | null;
	altText: string | null;
	price: number | null;
	currency: string | null;
	onSale: boolean | null;
	promotionalPrice: number | null;
	isAvailable: boolean | null;
}

export interface ProductParent {
  lineId: string;
}

export interface ProductFilterInput {
  lineId?: string;
  query?: string;
}