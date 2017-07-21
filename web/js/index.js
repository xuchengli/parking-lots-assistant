/**
 * Created by lixuc on 2017/7/16.
 */
import "../css/style.less";
import $ from "jquery";
import UIkit from "uikit-customization";
import Icons from "uikit-customization/dist/js/uikit-icons";
import Vue from "vue/dist/vue.esm";

UIkit.use(Icons);

Vue.component("todo-item", {
    props: ["item"],
    template: "<li>{{ item.text }}</li>"
});
var app = new Vue({
    el: "#app",
    data: {
        message: "hello vue",
        seen: true,
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
    },
    methods: {
        reverse() {
            this.message = this.message.split("").reverse().join("");
        }
    },
    filters: {
        capitalize: value => {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    computed: {
        reversedMessage() {
            return this.message.split("").reverse().join("");
        }
    }
});
app.$watch("message", function(newValue, oldValue) {
    console.info("new value: ", newValue, "old value: ", oldValue);
});
$("#btn").on("click", evt => {
    app.message = "changed message";
});
$("#btn2").on("click", evt => {
    app.items.push({
        id: 3,
        text: "item 4"
    });
});
