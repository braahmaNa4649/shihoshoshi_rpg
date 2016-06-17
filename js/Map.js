Namespace.screen.C_map.prototype = {
  name: "map",
  interval_id: -1,
  _initialize: function (){
    var self = this;
    // chrome対策
    this.model.chip_image.onload = function (){
      self.model.init_buffer();
      self.Draw_all( 0, 0 );
    };
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
    this.interval_id = this.Draw_all.applyInterval( 20, this, scroll_args );
  },
  stop_scroll: function (){
    clearInterval( this.interval_id );
  }
};
Class.Extend( Namespace.screen.C_screen, Namespace.screen.C_map );

Namespace.screen.M_map.prototype = {
  x: 1800,
  y: 1800,
  buffer_canvas: null,
  buffer_context: null,
  buffer_chip_count: 100,
  chip_image: null,
  chip_info:
      [
        { "x": 0, "y": 0 },
        { "x": 40, "y": 0 },
        { "x": 80, "y": 0 },
        { "x": 120, "y": 0 },
        { "x": 160, "y": 0 },
        { "x": 200, "y": 0 },
        { "x": 240, "y": 0 },
        { "x": 280, "y": 0 },
        { "x": 0, "y": 80 },
        { "x": 40, "y": 80 },
        { "x": 80, "y": 80 },
        { "x": 120, "y": 80 },
        { "x": 160, "y": 80 },
        { "x": 200, "y": 80 },
        { "x": 240, "y": 80 },
        { "x": 0, "y": 120 },
        { "x": 40, "y": 120 },
        { "x": 80, "y": 120 },
        { "x": 0, "y": 160 },
        { "x": 40, "y": 160 }
      ],
  _initialize: function (){
    with ( this ) {
      chip_image = new Image();
      // IE対策
      chip_image.src = get_chip_image_src();
      buffer_canvas = document.getElementById( 'buffer_map' );
      buffer_context = buffer_canvas.getContext( "2d" );
    }
  },
  init_buffer: function (){
    with ( this ) {
      var l = chip_info.length;
      for ( var i = 0;i < buffer_chip_count;i++ ) {
        for ( var j = 0;j < buffer_chip_count;j++ ) {
          var tmp = chip_info[Math.floor( Math.random() * l )];
          buffer_context.drawImage( chip_image,
              tmp.x, tmp.y, chip_width, chip_height,
              i * chip_width, j * chip_height, chip_width, chip_height );
        }
      }
    }
  },
  Get_scrolled_image: function ( scroll_x, scroll_y ){
    this.x += scroll_x;
    this.y += scroll_y;
    var image = this.buffer_context.getImageData( this.x, this.y, this.map_width, this.map_height );
    return image;
  },
  Get_scroll_args: function ( dest ){
    var args = [ 0, 0 ];
    switch ( dest ) {
      case Namespace.global.Mediator.DEST_LEFT:
        args = [ -1, 0 ];
        break;
      case Namespace.global.Mediator.DEST_UP:
        args = [ 0, -1 ];
        break;
      case Namespace.global.Mediator.DEST_RIGHT:
        args = [ 1, 0 ];
        break;
      case "down":
      case Namespace.global.Mediator.DEST_DOWN:
        args = [ 0, 1 ];
        break;
      default:
        break;
    }

    return args;

  }
};
Class.Extend( Namespace.screen.M_screen, Namespace.screen.M_map );

Namespace.screen.V_map.prototype = {
  _initialize: function (){ },
  _draw_all: function (){
    // chrome対策
    // 初回描画用に分岐
    if ( this.char_image.width ) {
      this.draw_char();
    }
    else {
      $( this.char_image ).bind( "load", this.draw_char.bind( this ) );
    }
  },
  draw_char: function (){
    this.context.drawImage( this.char_image, 0, 160, 40, 40, 180, 180, 40, 40 );
  }
};
Class.Extend( Namespace.screen.V_screen, Namespace.screen.V_map );