jQuery.noConflict();
(function(){

var $ = jQuery;

$('#main_nav-toggle').click(function(){
	$(this).toggleClass('open');
	$('#main_nav-container').slideToggle('fast');
});

$('#section_nav_toggle').click(function(){
	$(this).toggleClass('open');
	$('#section_nav > ul').slideToggle('fast');
});

/* Equal Height Rows */
equalheight = function(container){

var currentTallest = 0,
     currentRowStart = 0,
     rowDivs = new Array(),
     $el,
     topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(window).load(function() {
  equalheight('.equal-height');
});


$(window).resize(function(){
  equalheight('.equal-height');
});


/* Email Scroll to Top */
$('#page_e_postcards .preview').click(function() {
	window.scrollTo(0, 0);
});

/* Cross-browser placeholders */
$('[placeholder]').focus(function() {
	var input = $(this);
	if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	}
}).blur(function() {
	var input = $(this);
	if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	}
}).blur();
$('[placeholder]').parents('form').submit(function() {
	$(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
		}
	})
});

/**
 * Magnific popup triggers
 */
$('.mp-popup-inline').magnificPopup({
	type: 'inline'
});

})();