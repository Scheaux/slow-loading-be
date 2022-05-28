const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { faker } = require('@faker-js/faker');

const router = new Router();
const app = new Koa();
const port = process.env.PORT || 1733;
const server = http.createServer(app.callback());

app.use(cors());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/data', async (ctx, next) => {
  const response = new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
      }, {
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
      }, {
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
      }]);
    }, 3000);
  });

  ctx.response.body = await response;
  await next();
});

server.listen(port);
