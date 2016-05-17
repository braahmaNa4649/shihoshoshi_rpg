Namespace.global.Mediator = {
  map: null,
  gamepad: null,
	battle:null,
  Initialize: function ( _map, _gamepad,_battle ){
    with ( this ) {
      map = _map;
      gamepad = _gamepad;
			battle=_battle;
    }
  },
  Notify4screen: function ( state ){
		// !todo: map,battle等アクティブウィンドウ取得して投げる
    this.map.Receive_notify( state );
    this.battle.Receive_notify( state );
  }
};