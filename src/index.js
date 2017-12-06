var _ = require('lodash');
var Watcher = require('./watcher')
var Observer = require('./observer')


function MVVM(options) {
    this._init(options)
}

MVVM.prototype._init = function(options) {
    this.data = options.data
    this.dataObserver = new Observer(this.data)
    //observer.observe(this.data)
}

MVVM.prototype._observeCurrentData = function() {
  this.dataObserver = new Observer(this.data)
}

var option = {

  data: {
    arr: [1, 2, 3],
    obj: {
        obj_1: "1",
        obj_2: {
            obj_2_1: "2_1",
            obj_2_2: "2_2"
        }
    },
    str: "name"
}

}

var w = new Watcher()

var vm = new MVVM(option)
w.bind(vm,"str")
//vm.data.name = "name"
vm.data.str = "strnew"
vm.data.str1 = "strne2w"

vm._observeCurrentData()
var w2 = new Watcher()
w2.bind(vm,"str1")
var w3 = new Watcher()
w3.bind(vm,"str1")
vm.data.str1 = {"strne222w":"22"}

// function component() {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
// }

// document.body.appendChild(component());

// export default function Mao() {
//     this.name = "mao"
// }