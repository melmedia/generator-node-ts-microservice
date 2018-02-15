'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {
    this.log(
      'Welcome to the marvelous ' + chalk.red('generator-node-ts-microservice') + ' generator!'
    );

    const prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'Package name for package.json, name of installation folder in /opt, usually the same as repo name',
      default: this.appname
    }];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    const mapping = [
      ['_package.json', 'package.json'],
      ['README.md', 'README.md'],
      ['tsconfig.json', 'tsconfig.json'],
      ['src/app.ts', 'src/app.ts'],
      ['src/bin/db-config.ts', 'src/bin/db-config.ts'],
    ];

    const params = {
      packageName: this.answers.packageName,
    };

    mapping.forEach(([template, destination]) => {
        this.fs.copyTpl(
          this.templatePath(template),
          this.destinationPath(destination),
          params
        );
      });

  }

  install() {
    this.yarnInstall();
  }

};
