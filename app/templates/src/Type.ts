import { di } from '@c7s/node-ts-framework';

export const Type = {
  ... di.Type,
  <%= entityName %>DataRepository: Symbol('<%= entityName %>DataRepository'),
};
