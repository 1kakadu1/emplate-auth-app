import express, { Express, Request, Response } from 'express';
import http from 'http';
import cors from "cors";
import cookieParser from "cookie-parser";
import useragent from 'express-useragent';
import { EntityManager, EntityRepository, MikroORM, RequestContext, t } from '@mikro-orm/core';
import { Token, User } from './entities';
import path from 'path';
import dotenv from 'dotenv';
import * as router from "./router";
import { errorMiddleware } from './middlewares/error.middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config()

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_REFRESH_SECRET: string;
      JWT_ACCESS_SECRET: string;
      PORT: number
    }
  }
}


const jsonUseOption: any = {
  extended: true
}

const app: Express = express();
const port = process.env.PORT || 8001;



export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>,
  tokenRepository: EntityRepository<Token>,
};

const init = (async () => {
  DI.orm = await MikroORM.init();
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.tokenRepository = DI.orm.em.getRepository(Token);

  const swaggerSpec = swaggerJSDoc({
    basePath: "/api",
    failOnErrors: true,
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AUTH APP',
        version: '1.0.0',
      },
    },
    apis: ['./router/index.ts'],
  });

  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use(express.json(jsonUseOption));
  app.use(express.static(path.join(__dirname, "build", "public")));
  app.use(cookieParser());
  app.use(useragent.express());
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }));
  app.use("/api", router.UserRouter);
  app.use(errorMiddleware);
  console.log(swaggerSpec);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example, try CRUD on /author and /book endpoints!' }));
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  DI.server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
});

init();