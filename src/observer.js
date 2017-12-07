var SubscriberList = require('./subscriberList')

Observer.prototype.observe = function (data) {
    if (typeof data !== 'object') return;
    Object.keys(data).forEach((key) => {
        this.listen(data, key, data[key])
        this.observe(data[key])
    })
}

Observer.prototype.listen = function (data, key, val) {
    var that = this
    var isConfigurable = (data, key) => Object.getOwnPropertyDescriptor(data, key).configurable
    if (!isConfigurable(data, key)) return
    var subscriberList = new SubscriberList()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get: function() {
          if(global.subscriber) subscriberList.add(global.subscriber)
          return JSON.parse(JSON.stringify(val));
        },
        set: function(newVal) {
            console.log(key+' changes from ', val, ' to ', newVal);
            console.log(newVal)
            console.log(subscriberList)
            childObj = new Observer(newVal);
            val = newVal;
            subscriberList.notify()
        }
    });
}

function Observer(obj){

    this.observe(obj)

}

module.exports = Observer
