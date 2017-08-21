/**
 * Created by lixuc on 2017/7/16.
 */
import "../css/style.less";
import $ from "jquery";
import UIkit from "uikit-customization";
import Icons from "uikit-customization/dist/js/uikit-icons";
import Vue from "vue";
// import UkProgress from "uk-progress";
import UkDnd from "uk-dnd";
import UkLine from "uk-line";

UIkit.use(Icons);

// Vue.component("todo-item", {
//     props: ["item"],
//     template: "<li>{{ item.text }}</li>"
// });
// Vue.component("uk-progress", UkProgress);
let drawing = false;
let jointLine = null;

Vue.component("uk-dnd", UkDnd);
Vue.component("uk-line", UkLine);
new Vue({
    el: "#app",
    mounted() {
        this.$tile = $(".uk-tile");
        this.tileOffset = this.$tile.offset();
    },
    methods: {
        dragend(x, y, width, height, children) {
            let rep = new Vue({
                render: h => h(
                    "uk-dnd",
                    {
                        attrs: {
                            x: x,
                            y: y,
                            width: width,
                            height: height,
                            clone: false,
                            target: ".uk-tile"
                        }
                    },
                    children
                )
            }).$mount();
            this.$tile.append(rep.$el);
        },
        drawstart(evt) {
            drawing = true;
            let startX = evt.clientX - this.tileOffset.left;
            let startY = evt.clientY - this.tileOffset.top;
            jointLine = new Vue({
                template: "<uk-line :x1='x1' :y1='y1' :x2='x2' :y2='y2' v-if='show'>" +
                          "</uk-line>",
                data: {
                    x1: startX,
                    y1: startY,
                    x2: startX,
                    y2: startY
                },
                computed: {
                    show() {
                        return this.x1 != this.x2 || this.y1 != this.y2;
                    }
                }
            }).$mount();
            this.$tile.append(jointLine.$el);
        },
        draw(evt) {
            if (drawing) {
                jointLine.x2 = evt.clientX - this.tileOffset.left;
                jointLine.y2 = evt.clientY - this.tileOffset.top;
            }
        },
        drawend(evt) {
            if (drawing) {
                drawing = false;
            }
        }
    }
});
// var app = new Vue({
//     el: "#app",
//     data: {
//         message: "hello vue",
//         seen: true,
//         hasError: true,
//         style: {
//             fontSize: "30px"
//         },
//         items: [
//             {
//                 id: 0,
//                 text: "代办项目1"
//             },
//             {
//                 id: 1,
//                 text: "代办项目2"
//             },
//             {
//                 id: 2,
//                 text: "代办项目3"
//             }
//         ]
//     },
//     methods: {
//         reverse() {
//             this.message = this.message.split("").reverse().join("");
//         },
//         dragend(x, y, width, height, children) {
//             let rep = new Vue({
//                 render: h => h(
//                     "uk-dnd",
//                     {
//                         attrs: {
//                             x: x,
//                             y: y,
//                             width: width,
//                             height: height,
//                             clone: false,
//                             target: "#container"
//                         }
//                     },
//                     children
//                 )
//             }).$mount();
//             $("#container").append(rep.$el);
//         }
//     },
//     filters: {
//         capitalize: value => {
//             if (!value) return "";
//             value = value.toString();
//             return value.charAt(0).toUpperCase() + value.slice(1);
//         }
//     },
//     computed: {
//         reversedMessage() {
//             return this.message.split("").reverse().join("");
//         }
//     }
// });
// app.$watch("message", function(newValue, oldValue) {
//     console.info("new value: ", newValue, "old value: ", oldValue);
// });
// $("#btn").on("click", evt => {
//     app.message = "changed message";
// });
// $("#btn2").on("click", evt => {
//     app.items.push({
//         id: 3,
//         text: "item 4"
//     });
// });
