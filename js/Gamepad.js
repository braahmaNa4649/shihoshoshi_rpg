function Gamepad(){
  this.assoc_events();
}
Gamepad.prototype = {
  btn_ids: [
    "btn_left",
    "btn_up",
    "btn_right",
    "btn_down"
  ],
  BTN_LEFT: "left",
  BTN_UP: "up",
  BTN_RIGHT: "right",
  BTN_DOWN: "down",
  MOUSE_BTN_LEFT: 1,
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_LEAVE: "mouseleave",
  state: {
    is_pushing: false,
    btn_type: ""
  },
  Get_state: function (){
    return this.state;
  },
  assoc_events: function (){
    var l = this.btn_ids.length;
    for ( var i = 0;i < l;i++ ) {
      var id = "#" + this.btn_ids[i];
      $( id ).mousedown( this.push.bind( this ) );
      $( id ).bind( "touchstart", this.push.bind( this ) );
      $( id ).mouseup( this.leave.bind( this ) );
      $( id ).mouseleave( this.leave.bind( this ) );
      $( id ).bind( "touchend", this.leave.bind( this ) );
    }
  },
  push: function ( e ){
    e.preventDefault();

    this.state.is_pushing = true;
    var key = e.target.id.toUpperCase();
    this.state.btn_type = this[key];
    Mediator.Notify4map( this.state );
  },
  leave: function ( e ){
    e.preventDefault();

    if ( this.state.is_pushing ) {
      this.state.is_pushing = false;
      this.state.btn_type = "";
      Mediator.Notify4map( this.state );
    }
  }

};
