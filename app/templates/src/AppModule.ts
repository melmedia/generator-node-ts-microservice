import * as path from 'path';
import { Connection, getRepository, Repository } from 'typeorm';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Logger } from 'log4js';
import { Module, LoggerFactory, DbConnectionFactory } from '@melmedia/node-ts-framework';
import {
  ServerConfig,
  ConfigFactory,
  LogConfig,
  DbConfig,
  ConfigFileChain,
} from '@melmedia/config';
import { EnvServiceDiscovery } from '@melmedia/rest-client';

import * as models from './infrastructure/models';
import { Type } from './Type';

/**
 * For most microservices one module is enough, so create pseudo-module referencing
 * root of microservice
 */
export class AppModule extends Module {

  protected get baseDirectory() {
    return __dirname;
  }

  public async initDiContainer(container: Container, allApplicationModules: Module[]) {
    container.load(buildProviderModule());

    const configSource = new ConfigFileChain(
      path.resolve(__dirname, '../config'),
      process.env.PABLO_ENV as string,
    );
    const configFactory = new ConfigFactory(configSource);

    container.bind<ServerConfig>(Type.ServerConfig)
      .toConstantValue(await configFactory.create<ServerConfig>(ServerConfig));
    container.bind<LogConfig>(Type.LogConfig)
      .toConstantValue(await configFactory.create<LogConfig>(LogConfig));
    container.bind<DbConfig>(Type.DbConfig)
      .toConstantValue(await configFactory.create<DbConfig>(DbConfig));

    container.bind<EnvServiceDiscovery>(Type.ServiceDiscovery).to(EnvServiceDiscovery);

    const loggerFactory = new LoggerFactory;
    container.bind<Logger>(Type.AppLogger)
      .toConstantValue(loggerFactory.create('app'));
    container.bind<Logger>(Type.DbLogger)
      .toConstantValue(loggerFactory.create('db'));
    container.bind<Logger>(Type.AccessLogger)
      .toConstantValue(loggerFactory.create('access'));

    container.bind<Connection>(Type.DbConnection)
      .toConstantValue(await (new DbConnectionFactory).create(allApplicationModules));

    container.bind<Repository<models.<%= entityName %>>>(Type.<%= entityName %>DataRepository)
      .toConstantValue(getRepository(models.<%= entityName %>));
  }

  public async end(container: Container) {
    await container.get<Connection>(Type.DbConnection).close();
  }

}
