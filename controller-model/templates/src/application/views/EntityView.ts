import lodashPick = require('lodash.pick');

import * as models from '../../infrastructure/models';

export class <%= entityName %>View {

  public index(<%= entityNameLower %>s: models.<%= entityName %>[]) {
    return <%= entityNameLower %>s.map(<%= entityNameLower %> => this.one(<%= entityNameLower %>));
  }

  public one(<%= entityNameLower %>: models.<%= entityName %>) {
    return lodashPick(
      <%= entityNameLower %>,
      [
        'id',
        'firstName',
        'lastName',
        'email',
        'isDraft',
      ],
    );
  }

}
