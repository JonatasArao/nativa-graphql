export interface Product {
	id: string;
	lineId: string;
	name: string;
	variant: string;
	keyIngredients: string[];
	description: string;
	altText: string;
	price: number;
	currency: string;
	onSale: boolean;
	promotionalPrice: number;
	isAvailable: boolean;
}