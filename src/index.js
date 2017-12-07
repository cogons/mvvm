var _ = require('lodash');
var Watcher = require('./watcher')
var Observer = require('./observer')
var Compiler = require('./compiler')

export default function MVVM(options) {
    this._init(options)
}

MVVM.prototype._init = function(options) {
    this.data = options.data
    this.dataObserver = new Observer(this.data)
    this.compiler = new Compiler(this, options.el)
        //observer.observe(this.data)
}

MVVM.prototype._observeCurrentData = function() {
    this.dataObserver = new Observer(this.data)
}

// var option = {

//     el: "#root",

//     data: {
//         arr: [1, 2, 3],
//         obj: {
//             obj_1: "1",
//             obj_2: {
//                 obj_2_1: "2_1",
//                 obj_2_2: "2_2"
//             }
//         },
//         str: "name",
//         style: "color:black",
//         style2: "",
//         isShow: "false",
//         message: "hh"
//     }

// }

// var vm = new MVVM(option)


//w.bind("str",vm)
//vm.data.name = "name"
// vm.data.style = "strnew"
// vm.data.message = "strne2w"

// //vm._observeCurrentData()
// //var w2 = new Watcher()
// //w2.bind("str1",vm)
// //var w3 = new Watcher()
// //w3.bind("str1",vm)
// vm.data.str = { "strne222w": "22" }

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
// }

// document.body.appendChild(component());


    //console.log(document.querySelector("#root").firstChild); // "Hello world"