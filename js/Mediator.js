Namespace.global.Mediator = {
  map: null,
  gamepad: null,
  Initialize: function ( _map, _gamepad ){
    with ( this ) {
      map = _map;
      gamepad = _gamepad;
    }
  },
  Notify4map: function ( state ){
    this.map.Receive_notify( state );
  }
};