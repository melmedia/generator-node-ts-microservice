import { join, resolve } from 'path';
import { series, watch as gulpWatch, src, dest } from 'gulp';
import * as nodemon from 'gulp-nodemon';

const Paths = {
  Source: {
    Base: process.env.PABLO_BUILD_SRC_PATH || resolve(__dirname, '..'),
    Ts: 'src/**/*.ts',
    Config: 'config/**/*',
  },
  Dest: {
    Ts: resolve(__dirname, '..', 'dist'),
    Config: resolve(__dirname, '..', 'config'),
  },
};

function configs() {
  return src(join(Paths.Source.Base, Paths.Source.Config))
    .pipe(dest(Paths.Dest.Config));
}

function configsWatch() {
  gulpWatch(join(Paths.Source.Base, Paths.Source.Config), configs);
}

export const build = configs;

export const watch = series(build, configsWatch);

export const devServer = series(build, (done) => {
  configsWatch();
  nodemon({
    ...require(join(Paths.Source.Base, 'nodemon.json')),
    done,
    script: 'app',
  }).on('error', (err: any) => { console.error(err); });
});
