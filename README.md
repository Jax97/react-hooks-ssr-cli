# react-hooks-ssr-cli

### 客户端配置

1. react 基本组件搭建
2. webpack-html-plugin 动态读取 js

### 服务端配置

1. renderToString 将组件渲染成 HTMLstring res.body 渲染
2. 通过 loadData 将服务端取的数据返回,因为后端直出页面时已经走过一次服务端，避免通过客户端再走一次 ajax，可以将数据直接返回。
3. 将数据通过 Store 传输，绑定在 window(也称注水)

### UI 测试

backstop
