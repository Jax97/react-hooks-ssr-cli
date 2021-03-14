import Koa from 'koa';
import Router from 'koa-router';
import staticServe from 'koa-static';
import { render } from './utils/ssr';

const path = require('path');
const app = new Koa();
const router = new Router();

app.use(staticServe(path.join(__dirname, 'assets')));

router.get(['/', '/about'], async (ctx) => {
  // ssr
  await render(ctx);
});

router.get('/api/getData', (ctx) => {
  ctx.body = {
    code: 0,
    msg: '操作成功',
    data: '后端返回的数据',
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
