import { di } from '@melmedia/node-ts-framework';

export const Type = {
  ... di.Type,
  <%= entityName %>DataRepository: Symbol('<%= entityName %>DataRepository'),
};
