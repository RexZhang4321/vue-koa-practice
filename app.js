const app = require('koa')()
    , koa = require('koa-router')()
    , json = require('koa-json')
    , logger = require('koa-logger')
    , auth = require('./server/routes/auth.js');

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
    let start = new Date;
    yield next;
    let ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

app.on('error', function(err, ctx) {
    console.log('server error', err);
});

koa.use('/auth', auth.routes());

app.use(koa.routes());

app.listen(8889, () => {
    console.log('Koa is listening in 8889');
});

module.exports = app;
