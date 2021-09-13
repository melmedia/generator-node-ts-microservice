'use strict';
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

  initializing() {
    this.composeWith(require.resolve('../controller-model'));
  }

  prompting() {
    this.log('NodeJS Typescript backend REST microservice');
    this.log('!!! Go to empty folder before running generator !!!');

    const prompts = [
      {
        type: 'input',
        name: 'packageJsonName',
        message: 'Package name for package.json (has no meaning)',
        default: this.appname,
        filter: value => lodash.kebabCase(value),
        store: true,
      },
      {
        type: 'input',
        name: 'databaseName',
        message: 'PostgreSQL database name in snake_case',
        default: lodash.snakeCase(this.appname),
        store: true,
      },
      {
        type: 'input',
        name: 'dockerBaseNodejsImageTag',
        message: 'Docker base Node.js image tag (example: 10.18.1-buster)',
        default: '10.18.1-buster',
        store: true,
      },
      {
        type: 'input',
        name: 'entityName',
        message: 'Entity name for which create controller, forms, model. For example, "client" will do "ClientController"',
        filter: value => lodash.upperFirst(value.toLowerCase()),
        store: true,
      },
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
      this.config.set('packageJsonName', answers.packageJsonName);
      this.config.set('databaseName', answers.databaseName);
      this.config.set('dockerBaseNodejsImageTag', answers.dockerBaseNodejsImageTag);
      this.config.set('entityName', answers.entityName);
    });
  }

  writing() {
    const copyTemplatesMapping = [
      ['_.dockerignore', '.dockerignore'],
      ['_Dockerfile', 'Dockerfile'],
      ['_package.json', 'package.json'],
      ['_tslint.json', 'tslint.json'],
      ['nodemon.json'],
      ['tsconfig.json'],

      ['config/base/db.js'],
      ['config/base/log.json'],
      ['config/base/server.json'],
      ['config/prod/log.json'],
      ['config/loadtest/log.json'],
      ['config/_.gitignore', 'config/.gitignore'],

      ['src/app.ts'],
      ['src/AppModule.ts'],
      ['src/bootstrap.ts'],
      ['src/console.ts'],
      ['src/Type.ts'],
      ['src/gulpfile.ts'],
    ];

    const emptyDirectories = [
      'src/application/controllers',
      'src/application/forms',
      'src/application/views',
      'src/components',
      'src/infrastructure/migrations',
      'src/infrastructure/models',
    ];

    const params = {
      packageName: this.answers.packageName,
      databaseName: this.answers.databaseName,
      entityName: this.config.get('entityName'),
      entityNameLower: this.config.get('entityName').toLowerCase(),
      dockerBaseNodejsImageTag: this.answers.dockerBaseNodejsImageTag,
    };

    copyTemplatesMapping.forEach(([template, destination]) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination ? destination : template),
        params
      );
    });

    emptyDirectories.forEach(dir => {
      mkdirp.sync(dir);
    });

  }

};
