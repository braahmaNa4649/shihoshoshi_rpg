var Mediator = null;
$( window ).ready( function (){
  var c_map = new C_map( "map" );
  var gamepad = new Gamepad();
  Mediator = new _Mediator( c_map, gamepad );
} );