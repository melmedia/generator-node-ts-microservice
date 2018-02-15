'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {
    this.log('Deploy as standalone application');
  }

  writing() {
    const packageName = this.answers.packageName;

    const mapping = [
      ['apidoc.json'],
      ['build.xml'],
      ['packaging_ignore.txt'],
      ['bin/build'],
      ['bin/deploy'],
      ['bin/environment'],
      ['environment/packageName.prod.conf', `environment/${packageName}.prod.conf`],
      ['environment/packageName.prod.conf', `environment/${packageName}.qa.conf`],
    ];

    const params = {
      packageName: this.answers.packageName,
      projectTitle: this.answers.projectTitle,
      databaseName: this.answers.databaseName,
      envVariableName: this.answers.envVariableName,
      optFolderName: this.config.get('optFolderName'),
    };

    mapping.forEach(([template, destination]) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination ? destination : template),
        params
      );
    });

  }

};
