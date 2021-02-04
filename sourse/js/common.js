
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js, .menu-mobile--js ul li a")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link, .menu-mobile--js ul li a", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top-60;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();


	function whenResize() {
		const topH = document.querySelector("header ").offsetHeight;
		if ($(window).scrollTop() > topH) {
			document.querySelector('.top-nav  ').classList.add('fixed');
		} else {
			document.querySelector('.top-nav  ').classList.remove('fixed');
		}

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
	}

	const swiperRew = new Swiper('.sRews__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		autoHeight: true,
		spaceBetween: 200,
		navigation: {
			nextEl: '.sRews .swiper-button-next',
			prevEl: '.sRews .swiper-button-prev',
		},
		pagination: {
			el: '.sRews .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			576: {
				spaceBetween: 576
			},
			768: {
				spaceBetween: 768
			},
			992: {
				spaceBetween: 1100
			},
			2000: {
				spaceBetween: 3000
			}
		},
	});
	// modal window

	//sQusetions js
	let qItem = document.querySelectorAll(".q-item-js");
	qItem.forEach(function (el) {
		el.addEventListener('click', function () {
			let allItems = document.querySelectorAll('.q-item-js');
			let self = this;

			for (let item of allItems) {
				let currContent = item.querySelector('.q-content-js');

				if (item === self) {
					item.classList.toggle('active');
					currContent.classList.toggle('active');
				}
				else {
					item.classList.remove('active');
					currContent.classList.remove('active');
				}

			}

		})
	})


	let videoBtn = document.querySelectorAll(".sVideo .videoBlock:not(.active)");
	videoBtn.forEach(function(ell){
		ell.addEventListener('click', function () {

			this.classList.add("active");
			this.innerHTML += this.dataset.src;
		})
	})


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }