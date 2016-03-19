function C_map( _id ){
  with ( this ) {
    id = _id;
    model = new M_map();
    view = new V_map( id );
    // chrome対策
    model.chip_image.onload = function (){
      model.init_buffer();
      // withにbindっぽい効果が有るから正常に呼び出せる
      // this.draw_allとか書くとthisにchip_imageがセットされて死ぬ by IE9
      draw_all( 0, 0 );
    };
  }
}

C_map.prototype = {
  id: "",
  model: null,
  view: null,
  interval_id: -1,
  Receive_notify: function ( state ){
    if ( state.is_pushing ) {
      this.scroll( state.btn_type );
    }
    else {
      this.stop_scroll();
    }
  },
  scroll: function ( dest ){
    var scroll_arg = this.model.Get_scroll_args( dest );
    this.interval_id = this.draw_all.applyInterval( 20, this, scroll_arg );
  },
  stop_scroll: function (){
    clearInterval( this.interval_id );
  },
  draw_all: function ( scroll_x, scroll_y ){
    var image = this.model.get_scrolled_image( scroll_x, scroll_y );
    this.view.draw_all( image );
  }
};

function M_map(){

  with ( this ) {
    chip_image = new Image();
    // IE対策
    chip_image.src = "img/chip_40.png" + "?" + new Date().getTime();
    buffer_canvas = document.getElementById( 'buffer_map' );
    buffer_context = buffer_canvas.getContext( "2d" );
  }
}

M_map.prototype = {
  x: 1800,
  y: 1800,
  buffer_canvas: null,
  buffer_context: null,
  buffer_chip_count: 100,
  map_chip_count: 10,
  map_width: 400,
  map_height: 400,
  chip_width: 40,
  chip_height: 40,
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
  get_scrolled_image: function ( scroll_x, scroll_y ){
    this.x += scroll_x;
    this.y += scroll_y;
    var image = this.buffer_context.getImageData( this.x, this.y, this.map_width, this.map_height );
    return image;
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

function V_map( id ){
  with ( this ) {
    canvas = document.getElementById( id );
    context = this.canvas.getContext( "2d" );
    char_image = new Image();
    // IE対策
    char_image.src = "img/char_40.png" + "?" + new Date().getTime();
  }
}

V_map.prototype = {
  canvas: null,
  context: null,
  char_image: null,
  draw_all: function ( image_data ){
    this.context.putImageData( image_data, 0, 0 );
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

//  draw: function ( sx, sy ){
//    for ( var i = 0;i < map_chip_count;i++ ) {
//      for ( var j = 0;j < map_chip_count;j++ ) {
//        map_context.drawImage( buffer_map_canvas,
//            x + i * chip_width, y + j * chip_height, chip_width, chip_height,
//            i * chip_width, j * chip_height, chip_width, chip_height );
//      }
//    }
//  }
};