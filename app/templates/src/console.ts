import { AppModule } from './AppModule';
import { Application } from '@melmedia/node-ts-framework';

export const modules = [new AppModule];
export const app = new Application(modules);
