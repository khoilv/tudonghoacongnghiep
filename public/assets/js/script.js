/**
 * Created by laiva on 5/10/2016.
 */
$(document).ready(function() {
// Slider Product hot
	$('#product_slider').carousel({
		interval: 3000
	});
	$('#product_slider').on('slid.bs.carousel', function() {
		//alert("slid");
	});
	
// Slider News
	$('#news_slider').carousel({
		interval: 0
	});
	
// Fix menu
	$('.menu_m').addClass('original').clone().insertAfter('.menu_m').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
	
	scrollIntervalID = setInterval(stickIt, 10);
	
	function stickIt() {
		
		var orgElementPos = $('.original').offset();
		orgElementTop = orgElementPos.top;
		
		if ($(window).scrollTop() >= (orgElementTop)) {
			// scrolled past the original position; now only show the cloned, sticky element.
			
			// Cloned element should always have same left position and width as original element.
			orgElement = $('.original');
			coordsOrgElement = orgElement.offset();
			leftOrgElement = coordsOrgElement.left;
			widthOrgElement = orgElement.css('width');
			$('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
			$('.original').css('visibility','hidden');
		} else {
			// not scrolled past the menu_m; only show the original menu_m.
			$('.cloned').hide();
			$('.original').css('visibility','visible');
		}
	}
	
// Side bar Production list
	$(".product-list-content li").click(function(){
		$(".product-list-content li ul").toggle(400);
	});
	
// Slider project detail
	$('#project_img_slider').carousel({
		interval: 3000
	});
	
});

