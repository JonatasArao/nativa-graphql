import express from 'express';
import morgan from 'morgan';
import apiRoutes from '@/api/routes';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { readFileSync } from 'fs';
import path from 'path';
import { resolvers } from './graphql/resolvers';
const typeDefs = readFileSync(path.join(__dirname, 'graphql/schema.graphql'), 'utf-8');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const startServer = async () => {
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