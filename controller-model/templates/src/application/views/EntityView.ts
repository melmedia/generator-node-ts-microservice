import lodashPick = require('lodash.pick');
import { <%= entityName %> } from '../../infrastructure/models/<%= entityName %>';

export class <%= entityName %>View {

  public index(<%= entityNameLower %>s: <%= entityName %>[]) {
    return <%= entityNameLower %>s.map((<%= entityNameLower %>) => {
      return lodashPick(
        <%= entityNameLower %>,
        [
          'id',
          'coachId',
          'nutritionistId',
          'source',
          'status',
        ],
      );
    });
  }

  public one(<%= entityNameLower %>: <%= entityName %>) {
    return lodashPick(
      <%= entityNameLower %>,
      [
        'id',
        'coachId',
        'nutritionistId',
        'source',
        'status',
      ],
    );
  }

}
