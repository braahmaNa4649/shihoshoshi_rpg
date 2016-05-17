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
  }

};
Class.Extend( Namespace.screen.M_screen, Namespace.screen.M_battle );

Namespace.screen.V_battle.prototype = {
  foreColor:"#FFFFFF",
  backColor:"#000000",
  fontSize:18,
  area_message_x:20,
  area_message_y:250,
  area_message_width:360,
  area_message_height:130,
	timerID: null,
	Get_timerID: function (){
		return this.timerID;
	},
	Set_timerID: function ( id ){
		this.timerID = id;
	},
  _initialize: function (){
    with (this.context){
      strokeStyle=this.foreColor;
      lineWidth=5;
      fillStyle=this.foreColor;
      textBaseline="top";
      font=this.fontSize+"px monospace";
      strokeRect(this.area_message_x,this.area_message_y,this.area_message_width,this.area_message_height );
      this.draw_message("債権者が現れた！");
    }
    this.draw_char();
  },
  draw_message:function(msg,isCont){
    // todo:write crlf
      this.context.fillStyle=this.foreColor;
      this.context.fillText(msg,40,270);
		if ( isCont===true) {
			this.draw_triangle();
		}
  },
	draw_triangle: function (){
		
	},
  clear_message:function(){
      this.context.fillStyle=this.backColor;
      this.context.fillRectangle(this.area_message_x,this.area_message_y,this.area_message_width,this.area_message_height );
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
