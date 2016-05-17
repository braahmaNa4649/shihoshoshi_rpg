Namespace.screen.C_screen.prototype = {
  id: "",
  name: "",
  model: null,
  view: null,
  __initialize: function (){
    this.model = Class.Create( eval( "Namespace.screen.M_" + this.name ), null );
    var chip_image_src=this.model.Get_char_image_src();
    this.view = Class.Create( eval( "Namespace.screen.V_" + this.name ), [ this.id,chip_image_src ] );
    this._initialize();
  },
  _initialize: function ( ){},
  Receive_notify: function ( state ){
    this._receive_notify( state );
  },
  _receive_notify: function ( state ){ },
  Draw_all: function ( x, y ){
    var image = this.model.Get_scrolled_image( x, y );
    this.view.Draw_all( image );
  },
	Get_is_active: function (){
		return this.model.Get_is_active();
	},
	Set_is_active: function (is_active){
		this.model.Set_is_active=is_active;
	}
};

Namespace.screen.M_screen.prototype = {
  x: -1,
  y: -1,
  map_chip_count: 10,
  map_width: 400,
  map_height: 400,
  chip_width: 40,
  chip_height: 40,
	is_active: false,
	Get_is_active: function (){
		return this.is_active;
	},
	Set_is_active: function ( is_active ){
		this.is_active = is_active;
	},
  __initialize: function (){
    this._initialize();
  },
  _initialize: function (){},
  get_chip_image_src:function (){
    return "img/chip_40.png" + "?" + new Date().getTime();
  },
  Get_char_image_src:function (){
    return "img/char_40.png" + "?" + new Date().getTime();
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

Namespace.screen.V_screen.prototype = {
  char_image: null,
  canvas: null,
  context: null,
  __initialize: function ( id,char_image_src ){
    this.canvas = document.getElementById( id );
    this.context = this.canvas.getContext( "2d" );
    this.char_image = new Image();
    this.char_image.src = char_image_src;
    this._initialize();
  },
  _initialize: function (){},
  Draw_all: function ( image_data ){
    this.context.putImageData( image_data, 0, 0 );
    this._draw_all();
  },
  _draw_all: function (){},
};