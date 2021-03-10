import Koa from 'koa';
import Router from 'koa-router';

import staticServe from 'koa-static';
const path = require('path');
const app = new Koa();
const router = new Router();

// app.use(staticServe('public'));
app.use(staticServe(path.join(__dirname, '..', 'assets')));


router.get('/', (ctx) => {
  ctx.body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React SSR</title>
</head>
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
</body>
</html>
`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});


