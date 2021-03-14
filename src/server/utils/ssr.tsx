import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createServerStore } from '../../shared/store';
import { routes } from '../../shared/Routes';
import Koa from 'koa';
import App from '../../shared/App';

const path = require('path');
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

interface IPromises {
  [propName: number]: any;
}

export async function render(ctx: Koa.Context) {
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
  await Promise.all(promises).then((data) => {
    const serverRender = templating(template);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={ctx.req.url}>
          <App></App>
        </StaticRouter>
      </Provider>
    );
    // 动态注入数据 (注水)

    ctx.body = serverRender({
      html,
      store: `<script>window.BACKEND_DATA=${JSON.stringify(
        store.getState()
      )}</script>`,
    });
  });
}
