Namespace.global.Mediator = {
  map: null,
  gamepad: null,
  battle: null,
  DEST_LEFT: "left",
  DEST_UP: "up",
  DEST_RIGHT: "right",
  DEST_DOWN: "down",
  Initialize: function ( _map, _gamepad, _battle ){
    with ( this ) {
      map = _map;
      gamepad = _gamepad;
      battle = _battle;
    }
  },
  Notify4map: function ( state ){
    this.map.Receive_notify( state );
    this.battle.Receive_notify( state );
  }
};