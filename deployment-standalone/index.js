'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  prompting() {
    this.log('Deploy as standalone application');
  }

  writing() {
    const packageName = this.config.get('packageName');

    const mapping = [
      ['apidoc.json'],
      ['build.xml'],
      ['packaging_ignore.txt'],
      ['bin/build'],
      ['bin/deploy'],
      ['bin/environment'],
      ['environment/supervisor/packageName.prod.conf', `environment/supervisor/${packageName}.prod.conf`],
      ['environment/supervisor/packageName.prod.conf', `environment/supervisor/${packageName}.qa.conf`],
    ];

    const params = {
      packageName,
      projectTitle: this.config.get('projectTitle'),
      databaseName: this.config.get('databaseName'),
      envVariableName: this.config.get('envVariableName'),
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
