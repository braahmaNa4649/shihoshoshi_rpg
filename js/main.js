$( window ).ready( function (){
  var c_map = Class.Create( Namespace.screen.C_map, null );
  var gamepad = Class.Create( Namespace.gamepad.Gamepad, null );
  var c_battle = Class.Create( Namespace.screen.C_battle, null );
  Namespace.global.Mediator.Initialize( c_map, gamepad,c_battle );
} );