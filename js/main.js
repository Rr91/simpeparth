$(document).ready(function(){
	
	$(window).on('load', function(){
		lowresImages($('.wrap__icon-image img'));
		lowresImages($('.banner-image img'));
	});
	
	function lowresImages(elem){
		if(window.devicePixelRatio > 1 && $(window).width() >= 768) {
		    var lowresImages = elem;
	
		    lowresImages.each(function(i) {
		    	$(this).attr({
		    		'width': $(this).width()
		    	});
	
				var lowres = $(this).attr('src');
				var highres = lowres.replace('.', '@2x.');
				$(this).attr('src', highres);
		    });
		}
	}
	
	$(window).on('load resize', function(){
		if(window.screen.width >= 768){
			headerOverlay();
		}
	});
	
	$(document).on('click', '.js-burgerMenu', function(){
		$(this).toggleClass('is-active');
		$('.header__bottom').toggleClass('is-open');
	});
	
	$(window).on('scroll load', function(){
		if($(window).width() >= 768){
			var scrolled = $(window).scrollTop(),
				header = $('.header'),
				headerHeight = header.height() - 65;
	
			if(scrolled > headerHeight){
				header.addClass('is-sticky');	
			}
			if(scrolled < headerHeight){
				header.removeClass('is-sticky');	
			}
		}
	});
	
	$(document).on('click', '.mobile__call', function(){
		$(this).parent().addClass('is-form-show');
		$(this).parent().find('input').focus();
	});

	if($('body').find('.js-scroll').length) {
		$('.js-scroll').customScroll({
			vertical: true,
			horizontal: false
		});
	}

	$(document).on('click', '.js-toggleLink', function(){
		var _this = $(this);
	
		_this.toggleClass('is-open');
		// _this.next().slideToggle(200);
		_this.next().toggle();
	
		// setTimeout(function(){
			$(window).trigger('scroll');
		// }, 200);
	
		if(_this.next().find('.js-scroll').length){
			$('.js-scroll').customScroll('updateBar');
		}
	});
	
	$('.js-rangePriceSlider').ionRangeSlider({
		type: 'double',
		min: $(this).data('min'),
		max: $(this).data('max'),
		force_edges: true
	}); 
	
	if($(window).width() <= 767){
		$('.filter__head.js-toggleLink').removeClass('is-open');
		$('.filter__body').hide();
	}
	
	
	/*
	 * Example filter work
	 */
	
	$(function(){
		var $toggleType = $('[data-toggle-type]'),
			$toggleSeries = $('[data-toggle-series]'),
			$togglePerformance = $('[data-toggle-performance]');
	
		$(document).on('click', '.js-catListType a', function(){
			$('.cat__label', $toggleType).text($(this).text());
	
			if($toggleType.hasClass('is-open'))
				$toggleType.addClass('is-active').trigger('click');
	
			if(!$toggleSeries.hasClass('is-open'))
				$toggleSeries.removeClass('is-disabled').trigger('click');
	
			return false;
		});
	
		$(document).on('click', '.js-catListSeries a', function(){
			$('.cat__label', $toggleSeries).text($(this).text());
	
			if($toggleSeries.hasClass('is-open'))
				$toggleSeries.addClass('is-active').trigger('click');
	
			if(!$togglePerformance.hasClass('is-open'))
				$togglePerformance.removeClass('is-disabled').trigger('click');
	
			return false;
		});
	
		$(document).on('change', '.js-performanceCheckbox input', function(){
			var checkboxText = [];
	
			$('.js-performanceCheckbox input:checked').each(function(){
				checkboxText.push(' ' + $(this).parent().text().trim());
			});
	
			if(checkboxText.length == 0){
				$('.cat__label', $togglePerformance).text($('.cat__label', $togglePerformance).data('default-label'));
			}
			else {
				$('.cat__label', $togglePerformance).text(checkboxText);
			}
		});
	});

	/*
	 * Search
	 */
	
	$(function(){
		var $body = $('body'),
			$searchInput = $('.search__input');
	
		$(document)
			.on('change input', '.search__input', function(){
				if($(window).width() >= 768){
					var val = $(this).val();
	
					$searchInput.val(val);
	
					if(val != ''){
						$body.addClass('search-is-open');
					}
					else {
						$body.removeClass('search-is-open');
					}
				}
			})
			.on('click', '.js-searchBoxToggle', function(event){
				event.stopPropagation();
				$body.addClass('search-is-open');
			})
			.on('click', '.js-searchBoxClose', function(){
				$body.removeClass('search-is-open');
			})
			.on('click', '.js-searchReset', function(){
				$searchInput.val('');
				$searchInput.eq(0).focus();
				$body.removeClass('search-is-open');
			})
			.on('click', function(event){
				if($('.search-box__container').has(event.target).length === 0 && $body.hasClass('search-is-open')){
					$body.removeClass('search-is-open');
				}
			});
	
	
		$(document).on('click', '.js-searchMobileToggle', function(event){
			if($(window).width() <= 767){
				event.preventDefault();
				event.stopPropagation();
				$('body').toggleClass('search-is-open');
			}
		});
	});

	$(document).on('click', '.js-viewListMode', function(event){
		event.stopPropagation();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.prod-elem__grid').addClass('list--grid');
	});
	
	$(document).on('click', '.js-viewTileMode', function(event){
		event.stopPropagation();
		$(this).addClass('is-active').siblings().removeClass('is-active');
		$('.prod-elem__grid').removeClass('list--grid');
	});

	function scrollToFixedAsideFilter(){
	    $('.aside__filter').scrollToFixed({
	    	marginTop: 65,
	        limit: function(){
	            var limit = $('.footer').offset().top - $('.aside__filter').outerHeight(true);
	
	            return limit;
	        }
	    });
	}
	
	if($(window).width() >= 768){
	    scrollToFixedAsideFilter();
	}

	var mainSwiper = new Swiper('.js-seriesSwiper .swiper-container', {
	    slidesPerView: 3,
	    nextButton: '.js-seriesSwiper .button-next',
	    prevButton: '.js-seriesSwiper .button-prev',
	    pagination: '.js-seriesSwiper .swiper-pagination',
	    paginationClickable: true,
	    breakpoints: {
	        5000: {
	            slidesPerView: 3
	        },
	        767: {
	            slidesPerView: 1,
	            autoHeight: true,
	            spaceBetween: 10
	        }
	    }
	});

	var $previewVerticalElem = $('.js-imagePreviewSwiper'),
	    $previewHorizontalElem = $('.js-horizontalPreviewSwiper');
	
	
	
	var previewSwiper = new Swiper('.js-imagePreviewSwiper .swiper-container', {
	    direction: 'vertical',
	    slidesPerView: 'auto'
	});
	
	var previewHorizontalSwiper = new Swiper('.js-horizontalPreviewSwiper .swiper-container', {
	    slidesPerView: 4,
	    spaceBetween: 16
	});
	
	var imageViewSwiper = new Swiper('.js-imageViewSwiper .swiper-container', {
	    nextButton: '.js-prodSwiperNext',
	    prevButton: '.js-prodSwiperPrev',
	    pagination: '.js-imageViewSwiper .swiper-pagination',
	    onSlideChangeEnd: function(swiper){
	        var index = swiper.realIndex;
	
	        $('.image__preview, .image__preview-horizontal').removeClass('is-active');
	        $('.js-imagePreviewSwiper .swiper-slide:eq('+ index +') .image__preview').addClass('is-active');
	        $('.js-horizontalPreviewSwiper .swiper-slide:eq('+ index +') .image__preview-horizontal').addClass('is-active');
	    },
	    onSlideNextEnd: function(){
	        if($previewVerticalElem.length > 0)
	            previewSwiper.slideNext();
	        if($previewHorizontalElem.length > 0)
	            previewHorizontalSwiper.slideNext();
	    },
	    onSlidePrevEnd: function(){
	        if($previewVerticalElem.length > 0)
	            previewSwiper.slidePrev();
	        if($previewHorizontalElem.length > 0)
	            previewHorizontalSwiper.slidePrev();
	    }
	});
	
	$(document).on('click', '.image__preview, .image__preview-horizontal', function(){
	    imageViewSwiper.slideTo($(this).parent().index());
	});
	
	var prodCarouselSwiper = new Swiper('.js-prodSwiper .swiper-container', {
	    slidesPerView: 5,
	    nextButton: '.js-prodSwiper .button-next',
	    prevButton: '.js-prodSwiper .button-prev',
	    pagination: '.js-prodSwiper .swiper-pagination',
	    paginationClickable: true
	});

	$(document).on('click', '.js-scrollLink', function(){
		var offsetTop = $(window).width() >= 768 ? 100 : 70;
	
		$('body, html').animate({
			scrollTop: $('' + $(this).attr('href') + '').offset().top - offsetTop
		}, 600);
	
		return false;
	});

	$(function(){
		$('.js-select').styler({
			singleSelectzIndex: 1,
			selectSmartPositioning: false
		});
	});

	// Phone mask
	if($('.js-phoneMask').length){
		$('.js-phoneMask').mask('?+7 (999) 999-99-99');
	}

	$(document).on('change', '.js-radioAccordion', function(){
		var _this = $(this);
	
		if(_this.is(':checked')){
			_this
				.parents('.accordion-item')
				.addClass('is-active')
				.siblings()
				.removeClass('is-active');
		}
	});

	$(function(){
		var yamap;
	
		if($('#map').length){
			ymaps.ready(function () {
				var map = $('#map'),
					pin = map.data('pin'),
					loc = map.data('loc').split(', ');
	
			    yamap = new ymaps.Map('map', {
			            center: loc,
			            zoom: 16,
			            controls: []
			        }, {
			            searchControlProvider: 'yandex#search'
			        }),
			        myPlacemark = new ymaps.Placemark(yamap.getCenter(), {}, {
			            iconLayout: 'default#image',
			            iconImageHref: pin,
			            iconImageSize: [44, 55],
			            iconImageOffset: [-22, -55]
			        });
	
			    yamap.geoObjects.add(myPlacemark);
			    yamap.behaviors.disable('scrollZoom');
	
			    if($(window).width() <= 767){
			    	yamap.behaviors.disable('drag');
			    }
			});
		}
	
		var $contactMap = $('.contact__map');
	
		$(document).on('click', '.contact__map', function(){
			if(!$contactMap.hasClass('is-full')){
				$contactMap.addClass('is-full');
				setTimeout(function(){
					yamap.container.fitToViewport();
				}, 300);
			}
		});
	
		$(document).on('click', '.js-closeFullMap', function(event){
			event.stopPropagation();
	
			if($contactMap.hasClass('is-full')){
				$contactMap.removeClass('is-full');
				setTimeout(function(){
					yamap.container.fitToViewport();
				}, 300);
			}
		});
	});

	$(document).on('click', '.js-orderDetailButton', function(){
		var _this = $(this),
			parent = _this.parents('.order-list__head'),
			label = _this.data('label'),
			secondLabel = _this.data('second-label');
	
		if(parent.hasClass('is-open')){
			_this.text(label);
			parent.removeClass('is-open');
		}
		else {
			_this.text(secondLabel);
			parent.addClass('is-open');
		}
	});
	
	$(document).on('click', '.js-orderDetailHide', function(){
		var parent = $(this).parents('.order-list__item');
		parent.find('.js-orderDetailButton').trigger('click');
	});

	$(document).on('click', '.js-modalLink', function(event){
		event.preventDefault();
		event.stopPropagation();
		$('' + $(this).data('modal') + '').addClass('is-open');
	});
	
	$(document).on('click', '.js-modalClose', function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.modal').removeClass('is-open');
	});
	
	$(document).on('click', function(){
		if($('.modal__box').has(event.target).length === 0){
		    $('.modal').removeClass('is-open');
		}
	});

	$(document).on('click', '.js-addToCart', function(event){
		event.preventDefault();
		$('.cart__link, .header__scroll-cart').addClass('is-active');
	});

});