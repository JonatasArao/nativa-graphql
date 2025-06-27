import { PrismaClient } from '@prisma/client';
import productList from '../data/productList.json';
import lineList from '../data/lineList.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  await prisma.product.deleteMany({});
  await prisma.line.deleteMany({});
  console.log('Tabelas limpas.');

  await prisma.line.createMany({
    data: lineList,
  });
  console.log(`${lineList.length} linhas de produtos criadas.`);

  for (const product of productList) {
    await prisma.product.create({
      data: {
        id: product.id,
        lineId: product.lineId,
        name: product.name,
        variant: product.variant,
        keyIngredients: JSON.stringify(product.keyIngredients),
        description: product.description,
        altText: product.altText,
        price: product.price,
        currency: product.currency,
        onSale: product.onSale,
        promotionalPrice: product.promotionalPrice,
        isAvailable: product.isAvailable,
      },
    });
  }
  console.log(`${productList.length} produtos criados.`);

  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Ocorreu um erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });