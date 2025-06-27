import { PrismaClient } from '@prisma/client';
import productList from './data/productList.json';
import lineList from './data/lineList.json';
import { normalizeString } from '../src/utils/string'

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  await prisma.product.deleteMany({});
  await prisma.line.deleteMany({});
  console.log('Tabelas limpas.');

  for (const line of lineList) {
    const { id, name, concept, description } = line || '';

    const searchableText = normalizeString(`${id} ${name} ${concept} ${description}`);

    await prisma.line.create({
      data: {
        id, name, concept, description, searchableText
      },
    });
  }
  console.log(`${lineList.length} linhas de produtos criadas.`);

  for (const product of productList) {
    const { 
      id, lineId, name,
      variant, keyIngredients, description,
      altText, price, currency,
      onSale, promotionalPrice, isAvailable,
    } = product || '';

    const searchableText = normalizeString(`${id} ${name} ${variant} ${description} ${keyIngredients.join(' ')}`);

    await prisma.product.create({
      data: {
        id, lineId, name,
        variant, description,
        keyIngredients: JSON.stringify(keyIngredients),
        altText, price, currency,
        onSale, promotionalPrice, isAvailable,
        searchableText
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