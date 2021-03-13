import Koa from 'koa';
import Router from 'koa-router';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../shared/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import staticServe from 'koa-static';
import { routes } from '../shared/Routes';
import { createServerStore } from '../shared/store';
import { Provider } from 'react-redux';

const path = require('path');
const app = new Koa();
const router = new Router();
const fs = require('fs');
const fileResole = (file: string) => path.resolve(__dirname, file);

const template = fs.readFileSync(fileResole('assets/index.html'), 'utf-8');

// 动态插入js和store函数
function templating(template: string) {
  // key.trim()中的key是any，所以props只能是any类型
  return (props: any) => {
    return template.replace(/<!--([a-zA-Z]*)?-->/g, (_, key) => {
      // key是匹配到的htm、store
      return props[key.trim()];
    });
  };
}

app.use(staticServe(path.join(__dirname, 'assets')));

interface IPromises {
  [propName: number]: any;
}

router.get(['/', '/about'], async (ctx) => {
  const promises: IPromises[] = [];
  const store = createServerStore();
  // 把所有带loadData的方法保存好，访问到对应路由时除法
  routes.some((route) => {
    const match = matchPath(ctx.request.path, route);
    // 判断是否匹配到前端路由
    if (match && route.loadData) {
      // promises[0] = route.loadData(store);
      promises.push(route.loadData(store));
    }
    return match;
  });

  // 等待所有请求完
  // 有服务端数据走这里，没有则正常渲染，走客户端
  await Promise.all(promises).then((data) => {
    const render = templating(template);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.req.url}>
          <App></App>
        </StaticRouter>
      </Provider>
    );
    // ctx.body = `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>React SSR</title>
    //   </head>
    //   <body>
    //       <div id="root">${html}</div>
    //       <script>
    //         window.BACKEND_DATA=${JSON.stringify(store.getState())}
    //       </script>
    //       <script src="bundle.js"></script>
    //   </body>
    //   </html>
    //   `;
    // 动态注入数据
    ctx.body = render({
      html,
      store: `<script>window.BACKEND_DATA=${JSON.stringify(
        store.getState()
      )}</script>`,
    });
  });
});

router.get('/getData', (ctx) => {
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
