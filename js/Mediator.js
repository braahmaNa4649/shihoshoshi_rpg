function _Mediator( _map, _gamepad ){
  with ( this ) {
    map = _map;
    gamepad = _gamepad;
  }
}

_Mediator.prototype = {
  map: null,
  gamepad: null,
  Notify4map: function ( state ){
    this.map.Receive_notify( state );
  }
};