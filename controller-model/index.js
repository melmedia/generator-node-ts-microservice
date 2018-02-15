'use strict';
const Generator = require('yeoman-generator');
const lodash = require('lodash');

module.exports = class extends Generator {

  default() {
    this.log('Controller, forms, view, model, migrations for entity');
  }

  writing() {
    const migrationTime = Date.now();
    const entityName = this.config.get('entityName');

    const copyTemplatesMapping = [
      ['application/controllers/EntityController.ts', `src/application/controllers/${entityName}Controller.ts`],
      ['application/forms/CreateEntityForm.ts', `src/application/forms/Create${entityName}Form.ts`],
      ['application/forms/UpdateEntityForm.ts', `src/application/forms/Update${entityName}Form.ts`],
      ['application/views/EntityView.ts', `src/application/views/${entityName}View.ts`],
      ['infrastructure/migrations/1508783377062-Entity.ts', `src/infrastructure/migrations/${migrationTime}-${entityName}.ts`],
      ['infrastructure/models/Entity.ts', `src/infrastructure/models/${entityName}.ts`],
    ];

    const params = {
      migrationTime,
      entityName,
      entityNameLower: entityName.toLowerCase(),
    };

    copyTemplatesMapping.forEach(([template, destination]) => {
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(destination ? destination : template),
        params
      );
    });
  }

};
