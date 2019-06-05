class ResMock {
  constructor(){
    this._status = undefined;
    this.sendCalledWith = undefined;
  }
  status(newStatus){
    this._status = newStatus;
    return this;
  }
  send(f){
    this.sendCalledWith = f;
    return this;
  }
}

module.exports = ResMock
