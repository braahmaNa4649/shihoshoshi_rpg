Namespace.screen.C_screen.prototype = {
  id: "",
  name: "",
  model: null,
  view: null,
  __initialize: function (){
    this.model = Class.Create( eval( "Namespace.screen.M_" + this.name ), null );
    this.view = Class.Create( eval( "Namespace.screen.V_" + this.name ), [ this.id ] );
    this._initialize( );
  },
  _initialize: function ( ){

  },
  Receive_notify: function ( state ){
    this._receive_notify( state );
  },
  _receive_notify: function ( state ){ },
  Draw_all: function ( x, y ){
    var image = this.model.Get_scrolled_image( x, y );
    this.view.Draw_all( image );
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
  __initialize: function (){
    this._initialize();
  },
  _initialize: function (){ }
};

Namespace.screen.V_screen.prototype = {
  canvas: null,
  context: null,
  __initialize: function ( id ){
    this.canvas = document.getElementById( id );
    this.context = this.canvas.getContext( "2d" );
    this._initialize();
  },
  _initialize: function (){},
  Draw_all: function ( image_data ){
    this.context.putImageData( image_data, 0, 0 );
    this._draw_all( image_data );
  },
  _draw_all: function ( image_data ){ },
};