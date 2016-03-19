function _Observer(){
}

_Observer.prototype = {
  lists: [ ],
  add: function ( target ){
    this.lists.push( target );
  },
  notify: function ( e ){
    var l = this.lists.length;
    for ( var i = 0;i < l;i++ ) {
      this.lists[i].update( e );
    }
  }
};