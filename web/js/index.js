/**
 * Created by lixuc on 2017/7/16.
 */
import "../css/style.less";
import $ from "jquery";
import UIkit from "uikit-customization";
import Icons from "uikit-customization/dist/js/uikit-icons";
import Vue from "vue/dist/vue.esm";

UIkit.use(Icons);

var app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!",
        seen: true
    },
    methods: {
        reverse() {
            this.message = this.message.split("").reverse().join("")
        }
    }
});
var app2 = new Vue({
    el: "#app-2",
    data: {
        items: [
            {
                text: "item 1"
            },
            {
                text: "item 2"
            },
            {
                text: "item 3"
            }
        ]
    }
});
$("#btn").on("click", evt => {
    app.message = "Changed message....";
});
$("#btn2").on("click", evt => {
    app2.items.push({ text: "item 4" });
});
Vue.component("todo-item", {
    props: ["item"],
    template: "<li>{{ item.text }}</li>"
});
var app3 = new Vue({
    el: "#app-3",
    data: {
        items: [
            {
                id: 0,
                text: "代办项目1"
            },
            {
                id: 1,
                text: "代办项目2"
            },
            {
                id: 2,
                text: "代办项目3"
            }
        ]
    }
});