import './bootstrap';
import { WebApplication, ErrorHandlingMiddleware } from '@melmedia/node-ts-framework';
import { AppModule } from './AppModule';

const modules = [new AppModule];
const app = new WebApplication(modules, [ErrorHandlingMiddleware]);
app.run();
