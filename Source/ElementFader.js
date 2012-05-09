/*
---
description: elementFader

license: MIT-style

authors:
- Anoop Gantayat (http://andriasang.com)

requires:
 core/1.3: '*'

provides: [ElementFader]

...
*/

(function(){

// Prevent the plugin from overwriting existing variables
if (this.ElementFader) return;

var ElementFader = this.ElementFader = new Class({
	
	Implements: [Options],
	
	options: {
		tween: { duration: "400ms", transition: Fx.Transitions.Quint.easeOut },
		full_opacity: 1.0,			// the maximum opacity on fade-in. Set to 1.0 for opaque.
		min_opacity: 0.2				// the minumum opacity on fade-out. Set to 0 to make the element invisible.
	},
	
	is_active: false,
	elem: null,
	
	initialize: function(elem, options) {
		
		this.setOptions (options);
		
		this.elem = document.id (elem);
		
		this.elem.set ('tween', this.options.tween);
		
		this.elem.addEvents ({
				
				mouseenter: function (e) {		// fade element if user points mouse at element
					this.elem.get ("tween").stop();
					this.fadeIn ();
				}.bind (this),
				
				mouseleave: function (e) {		// fade element out if user points mouse away from element
					this.elem.get ("tween").stop();
					if (this.is_active)
						this.fadeOut ();
				}.bind (this)
				
			});
		
	},
	
	// you can refer to the item as $(INSTANCE_NAME)
	toElement: function () {
		return this.elem;
	},
	
	activate: function() { this.is_active = true; },				// turn the mouse pointer fade functionality on or off.
	deactivate: function() { this.is_active = false; },
	
	fadeIn: function () {
		
			cur_opacity = this.elem.getStyle ("opacity");
			
			if (cur_opacity != this.options.full_opacity)
				this.elem.tween ("opacity", [cur_opacity, this.options.full_opacity])

	},
	
	fadeOut: function () {
		
		cur_opacity = this.elem.getStyle ("opacity");
		
		if (cur_opacity != this.options.min_opacity)
			this.elem.tween ("opacity", [cur_opacity, this.options.min_opacity]);
		
	}
	
});


})();
