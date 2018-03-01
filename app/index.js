'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const mkdirp = require('mkdirp');
const randomstring = require('randomstring');

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
        name: 'packageName',
        message: 'Package name for package.json, name of installation folder in /opt, usually the same as repo name',
        default: this.appname,
        filter: value => lodash.kebabCase(value),
        store: true,
      },
      {
        type: 'input',
        name: 'projectTitle',
        message: 'Project human-readable title for README, apidoc',
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
        name: 'serverListenPort',
        message: 'Server listen port',
        default: 3000,
        store: true,
      },
      {
        type: 'input',
        name: 'envVariableName',
        message: 'Environment variable to get current environment from (as in /opt/environment.sh)',
        default: lodash.snakeCase(this.appname).toUpperCase() + '_ENV',
        store: true,
      },
      {
        type: 'list',
        name: 'deploymentType',
        message: 'Deploy as standalone package (add bin/deploy, bin/build, ...) or with your project?',
        choices: ['Standalone', 'With project'],
        store: true,
      },
      {
        type: 'input',
        name: 'entityName',
        message: 'Entity name for which create controller, forms, model. For example, "client" will do "ClientController"',
        filter: value => lodash.upperFirst(value.toLowerCase()),
        store: true,
      },
      {
        when: answers => 'Standalone' !== answers.deploymentType,
        type: 'input',
        name: 'optFolderName',
        message: 'Name of installation folder in /opt (name of containing project)',
        default: path.basename(path.resolve(this.sourceRoot(), '..')),
        store: true,
      },
      {
        when: answers => 'Standalone' !== answers.deploymentType,
        type: 'input',
        name: 'shortProjectName',
        message: 'Name of this project folder in containing package (/opt/.../current/NAME)',
        default: this.appname,
        store: true,
      },
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
      this.config.set('packageName', answers.packageName);
      this.config.set('projectTitle', answers.projectTitle);
      this.config.set('databaseName', answers.databaseName);
      this.config.set('envVariableName', answers.envVariableName);
      this.config.set('entityName', answers.entityName);
      this.config.set('optFolderName', answers.optFolderName);
      this.config.set('shortProjectName', answers.shortProjectName);

      this.composeWith(require.resolve(
        'Standalone' === answers.deploymentType ?
          '../deployment-standalone' :
          '../deployment-microservice'
      ));
    });
  }

  writing() {
    const copyTemplatesMapping = [
      ['_.gitignore', '.gitignore'],
      ['_package.json', 'package.json'],
      ['_tslint.json', 'tslint.json'],
      ['README.md'],
      ['tsconfig.json'],
      ['config/base/db.json'],
      ['config/base/log.json'],
      ['config/base/server.json'],
      ['config/base/services.json'],
      ['config/dev/db.json'],
      ['config/dev/log.json'],
      ['config/dev/server.json'],
      ['config/prod/db.json'],
      ['config/prod/server.json'],
      ['config/qa/db.json'],
      ['config/qa/server.json'],
      ['config/_.gitignore', 'config/.gitignore'],
      ['src/app.ts'],
      ['src/AppModule.ts'],
      ['src/bootstrap.ts'],
      ['src/console.ts'],
      ['src/Type.ts'],
      ['src/bin/db-config.ts'],
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
      projectTitle: this.answers.projectTitle,
      databaseName: this.answers.databaseName,
      envVariableName: this.answers.envVariableName,
      environmentScriptPath: 'Standalone' === this.answers.deploymentType ? 'bin/environment' : '../bin/environment',
      entityName: this.config.get('entityName'),
      entityNameLower: this.config.get('entityName').toLowerCase(),
      randomPassword: randomstring.generate(10),
      serverListenPort: this.answers.serverListenPort,
      shortProjectName: this.answers.shortProjectName,
      deploymentType: this.answers.deploymentType,
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

  install() {
    this.yarnInstall();
  }

};
