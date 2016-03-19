var Class = {
  Create: function ( o, args ){
    var klass = function (){};
    klass.prototype = o.prototype;
    var k = new klass;
    k.initialize.apply( k, args );

    return k;
  },
  Extend: function ( src, dest ){
    for ( var p in src.prototype ) {
      if ( dest.prototype[p] === undefined ) {
        dest.prototype[ p ] = p;
      }
    }
  }
};