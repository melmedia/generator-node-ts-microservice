#!/usr/bin/env node
import '../bootstrap';
import { argv } from 'yargs';
import { Repository } from 'typeorm';
import { di } from '@c7s/node-ts-framework';
import { Type } from '../Type';
import { Client, Status } from '../infrastructure/models/Client';
import { app } from '../console';

class Fixture<%= entityName %>s {
  @di.inject(Type.<%= entityName %>DataRepository)
  protected <%= entityNameLower %>DataRepository!: Repository<<%= entityName %>>;

  public async create<%= entityName %>(nutritionistId: number) {
    const <%= entityNameLower %> = new <%= entityName %>;
    <%= entityNameLower %>.nutritionistId = nutritionistId;
    <%= entityNameLower %>.status = Status.Eating;
    await this.<%= entityNameLower %>DataRepository.save(<%= entityNameLower %>);

    console.log('<%= entityName %> created');
  }

}

app.init().then(() => {
  const <%= entityNameLower %>Id: string | undefined = argv.<%= entityNameLower %>Id;
  (new Fixture<%= entityName %>s).create<%= entityName %>(Number(<%= entityNameLower %>Id));
});
