// todo: write battle class
Namespace.screen.C_battle.prototype = {
  name: "battle",
  _initialize: function (){
  },
  _receive_notify: function ( state ){
    if ( state.is_pushing && state.btn_type === this.mediator.KIND_OK ) {
      var msg = this.model.GetMessages();
      this.view.DrawBattle( msg );
//    console.log(state);
    }
    else {
//    console.log(state);
//this.view.clear_message();
    }
  }
};
Class.Extend( Namespace.screen.C_screen, Namespace.screen.C_battle );

Namespace.screen.M_battle.prototype = {
  messages: [
    "債権者が現れた！",
    "債権者はいきなり襲い掛かってきた！",
    "問題です。",
    "次の問に○か×で答えよ。"
  ],
  _initialize: function ( mediator ){
  },
  GetMessages: function (){
    return this.messages;
  },
};
Class.Extend( Namespace.screen.M_screen, Namespace.screen.M_battle );

Namespace.screen.V_battle.prototype = {
  foreColor: "#FFFFFF",
  backColor: "#000000",
  fontSize: 18,
  area_message_x: 20,
  area_message_y: 250,
  area_message_width: 360,
  area_message_height: 130,
  _initialize: function (){
    with ( this.context ) {
      strokeStyle = this.foreColor;
      lineWidth = 5;
      fillStyle = this.foreColor;
      textBaseline = "top";
      font = this.fontSize + "px monospace";
    }
  },
  DrawBattle: function ( msgs ){
    this.drawRect();
    this.clear_message();
    this.draw_message( msgs );
    this.draw_char();
  },
  drawRect: function (){
    this.context.strokeRect( this.area_message_x, this.area_message_y, this.area_message_width, this.area_message_height );
  },
  draw_message: function ( msgs ){
    this.context.fillStyle = this.foreColor;
    var l = msgs.length;
    for ( var i = 0;i < l;i++ ) {
      this.context.fillText( msgs[i], 40, 270 + 25 * i );
    }
  },
  clear_message: function (){
    this.context.fillStyle = this.backColor;
    this.context.fillRect( this.area_message_x, this.area_message_y, this.area_message_width, this.area_message_height );
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
