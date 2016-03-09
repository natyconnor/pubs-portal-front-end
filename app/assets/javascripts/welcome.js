// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {

	var $templateIsotope;
	var $requestIsotope;
	$("#create-request-templates").on('shown.bs.collapse', function(event) {
		createTemplateIsotope();
	});

	$("#current-requests").on('shown.bs.collapse', function(event) {
		createRequestIsotope();
	});

	$("#accordion .accordion-link").hover(
		function() {
			togglePanelClass($(this).closest('.panel'));
		});

	function togglePanelClass(el) {
		$(el).toggleClass('panel-default');
		$(el).toggleClass('panel-info');
	}

	/*
	 * Google material ink spot on click
	 */
	var parent, ink, d, x, y;
	$(".request-thumb a").click(function(e) {
		parent = $(this).parent();
		//create .ink element if it doesn't exist
		if(parent.find(".ink").length == 0)
			parent.prepend("<span class='ink'></span>");

		ink = parent.find(".ink");
		//incase of quick double clicks stop the previous animation
		ink.removeClass("animate");

		//set size of .ink
		if(!ink.height() && !ink.width())
		{
			//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}

		//get click coordinates
		//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;

		// set parent to hide overflow for ink
		parent.css('overflow', 'hidden');

		//set the position and add class .animate
		ink.css({top: y+'px', left: x+'px'}).addClass("animate");

		// set parent to show overflow again when the animation is done, in case tooltips need to show
		setTimeout(function () {
			parent.css('overflow', 'visible');
		}, 650); // 0.65s as determined in app.scss
	})

});

function createTemplateIsotope() {
	$templateIsotope = $("#templates-wall").isotope({
		itemSelector: '.template-cell',
		layoutMode: 'fitRows'
	});

	$("#filter-tags").select2({
		theme: 'bootstrap',
		placeholder: 'Filter templates by tags'
	}).on('change', function(e) {
		var filter = []
		var tags = $(this).val();
		if(tags) {
			for(var i = 0; i < tags.length; i++) {
				filter.push("."+tags[i]);
			}
		} else {
			filter.push("*");
		}
		$templateIsotope.isotope( { filter: filter.join('')});
	});

}
function createRequestIsotope() {
	$requestIsotope = $("#requests-wall").isotope({
		itemSelector: '.request-cell',
		layoutMode: 'fitRows',
		getSortData: {
			createdAt: function(el) {
				var date = new Date($(el).data('createdat'));
				return date.getTime(); // return numeric representation of date
			},
			updatedAt: function(el) {
				var date = new Date($(el).data('updatedat'));
				return date.getTime(); // return numeric representation of date
			},
			eventName: function(el) {
				// upper case of event name so lower case doesn't come later
				return $(el).find('.event-name').text().toUpperCase();
			},
			designerName: function(el) {
				return $(el).data('designername').toUpperCase(); // just in case someone enters their name lazily
			},
			reviewerName: function(el) {
				return $(el).data('reviewername').toUpperCase();
			},
			status: '[data-status] parseInt'
		},
		sortBy: 'createdAt'
	});

	$(".filter").click(function(event) {
		$("#filter-dropdown ~ ul>li").removeClass('active');
		$(this).closest('li').addClass('active');
		$(this).closest(".choose-filter").children('.filter-name').html($(this).html());
		var filter = $(this).data('filter');
		if(filter) {
			$requestIsotope.isotope({ filter: filter });
		}
	});

	$(".order").click(function(event) {
		$("#order-dropdown ~ ul>li").removeClass('active');
		$(this).closest('li').addClass('active');
		$(this).closest(".choose-order").find('.order-name span').html($(this).html());
		var order = $(this).data('order');
		if(order) {
			$requestIsotope.isotope( { sortBy: order });
		}
	});

	// quick search regex
	var qsRegex;

	// use value of search field to filter
	var $quicksearch = $('#request-quicksearch').keyup( debounce( function() {
		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$requestIsotope.isotope({ filter: function() {
			return qsRegex ? $(this).text().match( qsRegex ) : true;
		} });
	}, 200 ) );

}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
	var timeout;
	return function debounced() {
		if ( timeout ) {
			clearTimeout( timeout );
		}
		function delayed() {
			fn();
			timeout = null;
		}
		timeout = setTimeout( delayed, threshold || 100 );
	}
}
