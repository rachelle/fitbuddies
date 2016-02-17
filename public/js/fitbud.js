var $content = $('header .content')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

/* RequestAnimationFrame Shim */
window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/* Scroller */
function Scroller() {
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
  /* Initialize */
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  },

  /* Capture Scroll */
  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  /* Request Tick */
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  /* Update */
  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    
    /* Parallax Functionality */
    var slowScroll = currentScrollY / 4
      , blurScroll = currentScrollY * 2;
    
    $content.css({
      'transform'         : 'translateY(-' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
    });
    
    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};

/* Attach Scroller */
var scroller = new Scroller();  
scroller.init();

/* User Profile Card */
$(".hover").mouseleave(
  function() { 

    $(this).removeClass("hover"); 
  }
); 