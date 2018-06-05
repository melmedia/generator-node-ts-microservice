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
    const entityNameLower = entityName.toLowerCase();

    const copyTemplatesMapping = [
      ['src/bin/fixture-entities.ts', `src/bin/fixture-${entityNameLower}s.ts`],
      ['src/components/validation/ErrorMessages.ts', `src/components/validation/ErrorMessages.ts`],
      ['src/application/controllers/EntityController.ts', `src/application/controllers/${entityName}Controller.ts`],
      ['src/application/forms/CreateEntity.ts', `src/application/forms/Create${entityName}.ts`],
      ['src/application/forms/UpdateEntity.ts', `src/application/forms/Update${entityName}.ts`],
      ['src/application/forms/index.ts', `src/application/forms/index.ts`],
      ['src/application/views/EntityView.ts', `src/application/views/${entityName}View.ts`],
      ['src/infrastructure/migrations/1508783377062-Entity.ts', `src/infrastructure/migrations/${migrationTime}-${entityName}.ts`],
      ['src/infrastructure/models/Entity.ts', `src/infrastructure/models/${entityName}.ts`],
      ['src/infrastructure/models/index.ts', `src/infrastructure/models/index.ts`],
    ];

    const params = {
      migrationTime,
      entityName,
      entityNameLower,
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
