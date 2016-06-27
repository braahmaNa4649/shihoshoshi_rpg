Namespace.gamepad.Gamepad.prototype = {
  btn_ids: [
    "btn_left",
    "btn_up",
    "btn_right",
    "btn_down",
    "btn_ok"
  ],
  BTN_LEFT: "",
  BTN_UP: "",
  BTN_RIGHT: "",
  BTN_DOWN: "",
  BTN_OK: "",
  MOUSE_BTN_LEFT: 1,
  mediator: Namespace.global.Mediator,
  state: {
    is_pushing: false,
    btn_type: ""
  },
  __initialize: function ( args ){
    this.BTN_LEFT = this.mediator.DEST_LEFT;
    this.BTN_UP = this.mediator.DEST_UP;
    this.BTN_RIGHT = this.mediator.DEST_RIGHT;
    this.BTN_DOWN = this.mediator.DEST_DOWN;
    this.BTN_OK = this.mediator.KIND_OK;
    this.assoc_events();
  },
  Get_state: function (){
    return this.state;
  },
  assoc_events: function (){
    var l = this.btn_ids.length;
    for ( var i = 0;i < l;i++ ) {
      var id = "#" + this.btn_ids[i];
      $( id ).bind( "mousedown touchstart", $.proxy( this.push, this ) )
          .bind( "mouseup mouseleave touchend", $.proxy( this.leave, this ) );
    }

    $( window ).keydown( $.proxy( this.push, this ) )
        .keyup( $.proxy( this.leave, this ) );
  },
  push: function ( e ){
    // キー押しっぱなしの場合はイベントが果てしなく続いてしまう
    if ( this.state.is_pushing ) {
      return;
    }

    var type = "";
    if ( e.keyCode ) {
      type = this.getKey2Button( e.keyCode );
    }
    else if ( e.which ) {
      if ( e.which === this.MOUSE_BTN_LEFT ) {
        type = this[ e.target.id.toUpperCase() ];
      }
    }
    else if ( e.originalEvent.changedTouches ) {
      type = this[ e.target.id.toUpperCase() ];
    }

    if ( type ) {
      e.preventDefault();
      this.state.is_pushing = true;
      this.state.btn_type = type;
      this.mediator.Notify4map( this.state );
    }
  },
  leave: function ( e ){
    // 解除出来なくなるのが怖いので、単純チェックのみ
    if ( this.state.is_pushing ) {
      e.preventDefault();
      this.state.is_pushing = false;
      this.state.btn_type = "";
      this.mediator.Notify4map( this.state );
    }
  },
  getKey2Button: function ( keyCode ){
    var button = "";
    var codes = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      enter: 13
    };
    switch ( keyCode ) {
      case codes.left:
        button = this.BTN_LEFT;
        break;
      case codes.up:
        button = this.BTN_UP;
        break;
      case codes.right:
        button = this.BTN_RIGHT;
        break;
      case codes.down:
        button = this.BTN_DOWN;
        break;
      case codes.enter:
        button = this.BTN_OK;
        break;
      default :
        break;
    }

    return button;
  }

};
