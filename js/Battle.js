// todo: write battle class
Namespace.screen.C_battle.prototype = {
  id: "battle",
  name: "battle",
  _initialize: function (){
  },
  _receive_notify: function ( state ){
    if ( state.is_pushing ) {
      this.scroll( state.btn_type );
    }
    else {
      this.stop_scroll();
    }
  },
  scroll: function ( dest ){
    var scroll_args = this.model.Get_scroll_args( dest );
  }
};
Class.Extend( Namespace.screen.C_screen, Namespace.screen.C_battle );

Namespace.screen.M_battle.prototype = {
  x: -1,
  y: -1,
  _initialize: function (){
  },
 Get_scroll_args: function ( dest ){
    var args = [ 0, 0 ];
    switch ( dest ) {
      case "left":
        args = [ -1, 0 ];
        break;
      case "up":
        args = [ 0, -1 ];
        break;
      case "right":
        args = [ 1, 0 ];
        break;
      case "down":
        args = [ 0, 1 ];
        break;
      default:
        break;
    }

    return args;

  }
};
Class.Extend( Namespace.screen.M_screen, Namespace.screen.M_battle );

Namespace.screen.V_battle.prototype = {
  forecolor:"#FFFFFF",
  _initialize: function (){
    with (this.context){
      strokeStyle=this.forecolor;
      lineWidth=5;
      strokeRect(20,250,360,130)
    }
    this.draw_char();
  },
  _draw_all: function (){
  },
  draw_char: function (){
    // chrome対策
    // 初回描画用に分岐
    if ( this.char_image.width ) {
      this.context.drawImage( this.char_image, 120, 160, 40, 40, 180, 120, 80, 80 );
    }
    else {
      $( this.char_image ).bind( "load", this.draw_char.bind( this ) );
    }
  }
};
Class.Extend( Namespace.screen.V_screen, Namespace.screen.V_battle );