//const jsdom = require("jsdom");
var Watcher = require('./watcher')
// const { JSDOM } = jsdom;
// const dom = new JSDOM(`    <div id="root">  
// <input v-model="message"/>  
// <p v-bind:class="style">您输入的内容是{{message}}  {{message}} </p>  
// <div v-bind:class="style2" v-show="isShow"></div>  
// </div>  `);
// const document = dom.window.document


function Compiler(vm, el) {
    this.$vm = vm
    console.log(vm)
    this.$el = document.querySelector(el)
    this.$fragment = this.toFragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment);
}


Compiler.prototype = {
    toFragment: function(el) {

        var fragment = document.createDocumentFragment(),
            child;

        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        console.log(fragment)

        return fragment;
    },
    init: function() {
        this.compileElement(this.$fragment);
    },
    compileElement: function(el) {
        var childNodes = el.childNodes,
            vm = this.$vm;
        [].slice.call(childNodes).forEach((node) => {

            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/; // 表达式文本  
            if (node.nodeType == 1) { //普通标签  
                this.compileAttrs(node);
            } else if (node.nodeType == 3 && reg.test(text)) { //文本节点 #text  
                this.compileText(node);
            }
            if (node.childNodes && node.childNodes.length > 0) {
                this.compileElement(node); //递归调用  
            }
        })
    },
    compileText: function(node) { //当然这里需要匹配所有的{{exp}}  为每个不同的exp生成一个Watcher  
        var text = node.textContent;
        var reg = /\{\{([a-z|1-9|_]+)\}\}/g;
        reg.test(text);
        var exp = RegExp.$1;
        console.log("Watch new!",exp)
        new Watcher(exp, this.$vm, function(value) {
            node.textContent = text.replace(reg, value);
        });
    },
    compileAttrs: function(node) {
        var complieUtils = this.complieUtils;
        var attrs = node.attributes,
            me = this;
        [].slice.call(attrs).forEach(function(attr) {
            if (me.isDirective(attr)) {
                var dir = attr.name.substring(2).split(':')[0];
                var exp = attr.value;
                complieUtils[dir + '_compile'].call(me, node, attr, exp);

            }
        })
    },
    isDirective: function(attr) {
        return /v-*/.test(attr.name);
    },
    complieUtils: {
        model_compile: function(node, attr, exp) {
            node.addEventListener("keyup", (e) => {
                this.$vm.data[exp] = e.target.value;
            });
            node.removeAttribute(attr.name);
            new Watcher(exp, this.$vm, function(value) {
                node.value = value;
            });
        },
        bind_compile: function(node, attr, exp) {
            var attribute = attr.name.split(':')[1];
            node.removeAttribute(attr.name);
            new Watcher(exp, this.$vm, function(value) {
                node.setAttribute(attribute, value);
            });
        },
        show_compile: function(node, attr, exp) {
            node.removeAttribute(attr.name);
            new Watcher(exp, this.$vm, function(value) {
                node.style.visibility = value ? 'visible' : 'hidden';
            });
        }
    }
}



module.exports = Compiler