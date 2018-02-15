import * as lodash from 'lodash';
import { <%= entityName %> } from '../../infrastructure/models/<%= entityName %>';

export class <%= entityName %>View {

  public index(<%= entityNameLower %>s: <%= entityName %>[]) {
    return <%= entityNameLower %>s.map((<%= entityNameLower %>) => {
      return lodash.pick(
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
    return lodash.pick(
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
