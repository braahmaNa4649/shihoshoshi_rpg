var Class = {
  Create: function ( o, args ){
    var klass = function (){};
    klass.prototype = o.prototype;
    Object.defineProperty( klass.prototype, 'constructor', {
      value: o,
      enumerable: false
    } );
    var k = new klass();
    // argsは受け取る__initializeで可変の引数になる
    k.__initialize.apply( k, args );

    return k;
  },
  Extend: function ( src, dest ){
    for ( var p in src.prototype ) {
      if ( dest.prototype[ p ] === undefined ) {
        dest.prototype[ p ] = src.prototype[ p ];
      }
    }
  }
};