(function ($) {
	$(document).ready(function () {

		var num;
		if ($.cookie('name')) {
			$('.stars-cur').html($.cookie('name'));

			$('.star').each(function() {
				if($(this).data('rating') == $.cookie('name')) {
					$(this).prevAll().removeClass('default').addClass('active');
					$(this).removeClass('default').addClass('active');
				}
			});

			var num2 = $('.vidget-bottom span').html();
			var num3 = Number.parseInt(num2) + 1;
			$('.vidget-bottom span').html(num3);
		} else {
			$(".star").on('click', function () {
				$(this).removeClass('default').addClass('active');
				$(this).prevAll().removeClass('default').addClass('active');
				$(this).nextAll().addClass('default').removeClass('active');
			});

			
			$(".star").on('click', function() {
				$(this).removeClass('default').addClass('active');
				$(this).prevAll().removeClass('default').addClass('active');
				$(this).nextAll().addClass('default').removeClass('active');
				$('.stars-cur').html($(this).data('rating'));
				num = $(this).data('rating')
				$.cookie('name', num);
			});

		}

		$('.code__btn').click(function () {
			var copyText = $(this).parent().find('.code__code span').text();
			var copytext2 = document.createElement('input');
			copytext2.value = copyText;
			document.body.appendChild(copytext2);
			copytext2.select();
			document.execCommand("copy");
			document.body.removeChild(copytext2);
			alert('Текст скопирован');
		});

		$(document).on('click', '.anchor', function (e) {
			var fixed_offset = 50;
			$('html, body').stop().animate({
				scrollTop: $(this.hash).offset().top - fixed_offset
			}, 500);
			e.preventDefault();
		});

		$(".to-top").click(function () {
			$("html, body").animate({scrollTop: 0}, 1000);
		});

		if ($(document).innerWidth() <= 1200) {
			$('.header .menu').hide();
			$(document).on('click', '.burger', function () {
				if (!$(this).hasClass('active')) {
					$('.header .menu').slideDown();
					$(this).addClass('active');
				} else {
					$('.header .menu').slideUp();
					$(this).removeClass('active');
				}
			});
			$('.header .link + ul').hide();
			$(document).on('click', '.header .link', function () {
				$(this).next('ul').slideToggle()
				// if (!$(this).hasClass('active')) {
				// 	$('.header .menu').slideDown();
				// 	$(this).addClass('active');
				// } else {
				// 	$('.header .menu').slideUp();
				// 	$(this).removeClass('active');
				// }
			});
		}

		$('.qa .item__text').hide();
		$('.qa .item').on('click', function() {
			$(this).toggleClass('active');
			$(this).find('.item__text').slideToggle();
		});

		$('[data-fancybox="comment-gallery"]').fancybox({
			buttons: [
				"zoom",
				"fullScreen",
				"download",
				"thumbs",
				"close"
			],
			thumbs: {
				autoStart: true,
			},
		});
		
		var $scrollPos = 0;

		var footer = $('.footer').innerHeight();

		$(window).scroll(function () {
			var $st = $(this).scrollTop();
			if ($st > $scrollPos) {
				// Скролл Вниз
				$('.to-top').addClass('show');
			} else {
				// Скролл Вверх
				$('.to-top').removeClass('show');
			}
			if ($st == 0) {
				$('.to-top').removeClass('show');
			}
			$scrollPos = $st;
		});
		
	});
})(jQuery);