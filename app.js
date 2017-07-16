/**
 * Created by lixuc on 2017/7/15.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./modules/configuration");
const app = express();
const env = process.env.NODE_ENV || "production";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.env = env;
app.locals.context = config.Context_Path == "/" ? "" : config.Context_Path;

if (env == "development") {
    var webpack = require("webpack");
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");
    var webpackDevConfig = require("./webpack.dev");
    var compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    require("./routes")(app, config.Context_Path);

    var reload = require("reload");
    var http = require("http");
    var server = http.createServer(app);
    reload(app);
    server.listen(8080, function() {
        console.log("Development server started>>>");
    });
} else {
    app.use(config.Context_Path, express.static(path.join(__dirname, "public")));
    require("./routes")(app, config.Context_Path);
    app.listen(8080, function() {
        console.log("Server started>>>");
    });
}