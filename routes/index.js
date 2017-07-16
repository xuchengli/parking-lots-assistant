/**
 * Created by lixuc on 2017/7/16.
 */
module.exports = function(app, contextPath) {
    app.use(contextPath, require("./dashboard"));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
};