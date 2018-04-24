import * as path from 'path';
import { Connection, getRepository, Repository } from 'typeorm';
import { Container } from 'inversify';
import { Logger } from 'log4js';
import { Module, components } from '@c7s/node-ts-framework';
import {
  ServerConfig,
  ConfigFactory,
  LogConfig,
  DbConfig,
  ConfigFileChain,
} from '@c7s/config';
import { <%= entityName %> } from './infrastructure/models/<%= entityName %>';
import { Type } from './Type';

/**
 * For most microservices one module is enough, so create pseudo-module referencing
 * root of microservice
 */
export class AppModule extends Module {

  public async initDiContainer(container: Container, allApplicationModules: Module[]) {
    const configSource = new ConfigFileChain(
      path.resolve(__dirname, '../config'),
      process.env.<%= envVariableName %> as string,
    );
    const configFactory = new ConfigFactory(configSource);

    container.bind<ServerConfig>(Type.ServerConfig)
      .toConstantValue(await configFactory.create<ServerConfig>(ServerConfig));
    container.bind<LogConfig>(Type.LogConfig)
      .toConstantValue(await configFactory.create<LogConfig>(LogConfig));
    container.bind<DbConfig>(Type.DbConfig)
      .toConstantValue(await configFactory.create<DbConfig>(DbConfig));

    const loggerFactory = new components.LoggerFactory;
    container.bind<Logger>(Type.AppLogger)
      .toConstantValue(loggerFactory.create('app'));
    container.bind<Logger>(Type.DbLogger)
      .toConstantValue(loggerFactory.create('db'));
    container.bind<Logger>(Type.AccessLogger)
      .toConstantValue(loggerFactory.create('access'));

    container.bind<Connection>(Type.DbConnection)
      .toConstantValue(await (new components.DbConnectionFactory).create(allApplicationModules));

    container.bind<Repository<<%= entityName %>>>(Type.<%= entityName %>DataRepository)
      .toConstantValue(getRepository(<%= entityName %>));
  }

  public async end(container: Container) {
    await container.get<Connection>(Type.DbConnection).close();
  }

  protected get baseDirectory() {
    return __dirname;
  }

}
