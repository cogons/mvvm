
function SubscriberList(){
    this._list=[]
  }
  
  SubscriberList.prototype.add = function(subscriber){
    this._list.push(subscriber)
  }
  
  SubscriberList.prototype.notify = function(subscriber){
    this._list.forEach((s)=>s.update())
  }

  module.exports = SubscriberList