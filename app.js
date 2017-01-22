const app = require('koa')()
    , koa = require('koa-router')()
    , json = require('koa-json')
    , logger = require('koa-logger')
    , auth = require('./server/routes/auth.js')
    , api = require('./server/routes/api.js')
    , jwt = require('koa-jwt');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *(next){  //  如果JWT验证失败，返回验证失败信息
  try {
    yield next;
  } catch (err) {
    if (401 == err.status) {
      this.status = 401;
      this.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      };
    } else {
      throw err;
    }
  }
});

app.on('error', function(err, ctx) {
    console.log('server error', err);
});

koa.use('/auth', auth.routes());
koa.use("/api",jwt({secret: 'vue-koa-demo'}), api.routes());

app.use(koa.routes());

app.listen(8889, () => {
    console.log('Koa is listening in 8889');
});

module.exports = app;
