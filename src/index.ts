import app from '@/server';
import { config } from '@/config';

app.listen(config.port, () => {
  console.log(`🚀 Servidor rodando na porta ${config.port}`);
});