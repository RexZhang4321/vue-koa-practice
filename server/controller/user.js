const user = require('../models/user.js');
const jwt = require('koa-jwt');

const getUserInfo = function* () {
    const username = this.params.username;
    const result = yield user.getUserByUsername(username);
    this.body = result;
}

const postUserAuth = function* () {
    const data = this.request.body;
    console.log(this.request.body);
    const userInfo = yield user.getUserByUsername(data.username);
    if (userInfo != null) {
        if (userInfo.password != data.password) {
            this.body = {
                success: false,
                info: '密码错误！'
            }
        } else {
            const userToken = {
                name: userInfo.username,
                id: userInfo._id
            }
            const secret = 'vue-koa-demo';
            const token = jwt.sign(userToken, secret);
            this.body = {
                success: true,
                token: token
            }
        }
    } else {
        this.body = {
            success: false,
            info: '用户不存在！'
        }
    }
}

module.exports = {
    auth: (router) => {
        router.get('/user/:username', getUserInfo);
        router.post('/user', postUserAuth);
    }
}
