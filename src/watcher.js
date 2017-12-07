

function Watcher(exp,vm,cb){
    this.bind(exp,vm,cb)

  }
  
  Watcher.prototype.bind = function(exp,vm,cb){
  
    var that = this
    that.$vm = vm
    global.subscriber = that
    that.exp = exp
    that.$cb = cb
    that.val = that.$vm.data[exp]
    global.subscriber = null
  
  }
  
  Watcher.prototype.update = function(){
    
      var that = this
      that.val = that.$vm.data[that.exp]
      console.log('Updated!',that.val)
      if(that.$cb) that.$cb(that.val+"hey")
    
    }

    module.exports = Watcher