import { startServer } from '@/server';
import { config } from '@/config';

async function main() {
  const app = await startServer();
  app.listen(config.port, () => {
    console.log(`🚀 Servidor de dicas rodando em http://localhost:${config.port}/dica-do-dia`);
    console.log(`🚀 Servidor GraphQL rodando em http://localhost:${config.port}/graphql`);
  });
}

main();