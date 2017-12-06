

function Watcher(){
    this.list
  }
  
  Watcher.prototype.bind = function(vm,exp){
  
    var that = this
    that.vm = vm
    global.subscriber = that
    that.exp = exp
    that.val = vm.data[exp]
    global.subscriber = null
  
  }
  
  Watcher.prototype.update = function(){
    
      var that = this
      that.val = that.vm.data[that.exp]
      console.log('Updated!',that.val)
    
    }

    module.exports = Watcher