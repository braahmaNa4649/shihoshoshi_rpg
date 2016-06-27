Namespace.global.Mediator = {
  map: null,
  gamepad: null,
  battle: null,
  DEST_LEFT: "left",
  DEST_UP: "up",
  DEST_RIGHT: "right",
  DEST_DOWN: "down",
  KIND_OK: "ok",
  Initialize: function ( _map, _gamepad, _battle ){
    with ( this ) {
      map = _map;
      gamepad = _gamepad;
      battle = _battle;
    }
  },
  Notify4map: function ( state ){
    // todo: 該当オブジェクトのみにイベント送る様に
    this.map.Receive_notify( state );
    this.battle.Receive_notify( state );
  }
};