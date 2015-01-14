/*!
 * Google material design ripple effect
 * By Thomas Reynders http://thomasreynders.com
 * MIT Licensed.
 * 
 * Version 1.1
 * based on : http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
 * Github: https://github.com/ninox92/Google-material-design-ripple-effect/
 * preview: http://thomasreynders.com/google-material-design-plugin/
 */
(function ( $ ) {
	
	/**
	 *create a new jquery class object 
	 */
   	$.RippleEffect = function(o) {
		this.init(o);
	};

	/**
	 * Override 
	 */
	$.RippleEffect.prototype = {
		defaults:{
			//DO NOT CHANGE ORDER
			siblingElement:"<span class='ink'></span>",
			classes: ['animate', 'focus'],//animation classes
			sibling: '.ink'
		},
		data:{},//data from options
		init: function(o) {
			// initializes properties and methods
			this.setOptions(o);
			this.bind();
		},
		setOptions:function(o) {
			var obj = new Object();
			//append defaults
			for (var attrname in this.defaults) { obj[attrname] = this.defaults[attrname]; }
			//append options
			for (var attrname in o) { obj[attrname] = o[attrname]; }
			this.data = obj;
			
			return this;
		},
		bind: function(){
			var _ = this;
			//bind mouse down event to elements object from data
			if(this.data.elements){
				$(this.data.elements).mousedown(function(e){
					_.animate($(this), e, _.data.classes[0]);// make it animate
				});
			} else {
				throw new TypeError("Function.prototype.bind - Please set up the options for RippleEffect correctly! No elements are set, new $.RippleEffect({'elements':'.btn, ul li a'})"); 
			}
			//add focus if used
			if(this.data.focus){
				this.focus();
			}	
		},
		focus:function(){
			var _ = this;
			
			$(this.data.focus).focus(function(e){
				//add focus state to a element
				var _e = e,
					$t = $(this);
				
				//on animation-end animate the sibling focus animation.
				$(this).find(_.data.sibling).one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function() {
				    _.animate($t, _e, _.data.classes[1]);
				});
				
			}).focusout(function(){
			//remove css classes on focus out
				$(this).find(_.data.sibling).removeCssClasses(_.data.classes);
			});
		},
		animate: function(el, e, cssclass){
			var _ = this;
			
			//create sibling element if it doesn't exist
			if(el.find(this.data.sibling).length == 0){
				el.prepend( this.data.siblingElement );
			}
			
			//find sibling of parent
			ink = el.find(this.data.sibling);
			//incase of quick double clicks stop the previous animation
			el.removeCssClasses(this.data.classes);
			ink.removeCssClasses(this.data.classes);
			
			//set size of .ink 
			ink.resetDimensions();
			
			//get click coordinates
			//set to the middle of the element
			//set the position and add class .animate
			if(cssclass == this.data.classes[0]){//if animate
				x = e.pageX - el.offset().left - ink.width()/2;
				y = e.pageY - el.offset().top - ink.height()/2;
				el.addClass(cssclass);//animate button background color
				ink.css({top: y+'px', left: x+'px'}).addClass(cssclass);
			} else {//if focus
				ink.center().addClass(cssclass);
			}
		}
	};
	
	jQuery.fn.removeCssClasses = function(classes, isSVG){
		//remove all css classes that are equal to the data.classes object
		for(var i=0; i<classes.length; i++){
			if($(this).hasClass(classes[i])) $(this).removeClass(classes[i]);
		}
	};
	jQuery.fn.center = function () {
		//Center the element based on parent element
		this.css("top",((this.parent().outerHeight()/2) - (this.outerHeight()/2)) + 'px');
		this.css("left",(this.parent().outerWidth() - this.outerWidth()) + 'px');
		return this;
	};
	jQuery.fn.resetDimensions = function(){
		//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
		d = Math.max($(this).parent().outerWidth(), $(this).parent().outerHeight());
		$(this).css({height: d, width: d});
	};
})( jQuery );

