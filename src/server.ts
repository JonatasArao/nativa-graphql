import express from 'express';
import morgan from 'morgan';
import apiRoutes from '@/api/routes';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { readFile } from 'fs/promises';
import path from 'path';
import { resolvers } from './graphql/resolvers';

const app = express();

export const startServer = async () => {
  const typeDefs = await readFile(path.join(__dirname, 'graphql/schema.graphql'), 'utf-8');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(morgan('dev'));

  app.use('/', apiRoutes);

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server)
  );

  return app;
}