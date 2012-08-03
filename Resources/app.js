// ALPHABYTES

// Facebook like menu window
var leftMenu	= Ti.UI.createWindow({
	backgroundColor: 'red',
	top:   0,
	left:  0,
	width: 250,
	zIndex: 1	
});
var data = [{title:"Row 1"},{title:"Row 2"},{title:"Row 3"},{title:"Row 4"},{title:"Row 5"},{title:"Row 6"},{title:"Row 7"},{title:"Row 8"},{title:"Row 9"},{title:"Row 10"},{title:"Row 11"},{title:"Row 12"},{title:"Row 13"},{title:"Row 14"},{title:"Row 15"},{title:"Row 16"}];
var tableView	= Ti.UI.createTableView({ data: data });
leftMenu.add(tableView);
leftMenu.open();




// animations
var animateLeft	= Ti.UI.createAnimation({
	left: 250,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});
var animateRight	= Ti.UI.createAnimation({
	left: 0,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});
var animateNegativeLeft = Ti.UI.createAnimation({
				left: -250,
				curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
				duration: 500
});


var win = Titanium.UI.createWindow({
	left: 0,
	zIndex: 10
});
var win1 = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Facebook menu',
    left: 0,
	zIndex: 10
});
var nav = Titanium.UI.iPhone.createNavigationGroup({
   window: win1,
   left: 0,
   width: Ti.Platform.displayCaps.platformWidth
});
var button = Ti.UI.createButton({
	title: 'm',
	left: 10,
	width: 30,
	height: 30,
	top: 10
});
var touchStartX = 0;
var touchStarted = false;
win1.addEventListener('touchstart',function(e){
	touchStartX = parseInt(e.x,10);
});
win1.addEventListener('touchend',function(e){
	touchStarted = false;
	if( win.left < 0 ){
		if( win.left <= -240 ){
			win.animate(animateNegativeLeft);
			isToggled = true;
		} else {
			win.animate(animateRight);
			isToggled = false;
		}
	} else {
		if( win.left >= 240 ){
			win.animate(animateLeft);
			isToggled = true;
		} else {
			win.animate(animateRight);
			isToggled = false;
		}
	}
});
win1.addEventListener('touchmove',function(e){
	var x 		= parseInt(e.globalPoint.x, 10);
	var newLeft = x - touchStartX;
	if( touchStarted ){
		if( newLeft <= 250 && newLeft >= -250)
		win.left	= newLeft;
	}
	// Minimum movement is 30
	if( newLeft > 30 || newLeft < -30 ){
		touchStarted = true;
	}
});
nav.add(button);
win.add(nav);
win.open();


var isToggled = false;
button.addEventListener('click',function(e){
	if( !isToggled ){
		win.animate(animateLeft);
		isToggled = true;
	} else {
		win.animate(animateRight);
		isToggled = false;
	}
});