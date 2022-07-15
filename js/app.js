import * as flsFunctions from './modules/functions.js'

flsFunctions.isWebp()

/*-------SWIPER----------*/

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
Swiper.use([Autoplay]);
new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    watchOverflow: true,
    centeredSlides: true,
    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


    speed: 800,
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    breakpoints: {
        1600: {
            slidesPerView: 3,
        },
        1000: {
            slidesPerView: 2,
        },
        500: {
            slidesPerView: 1,
        },
        300: {
            slidesPerView: 1,
        },
        200: {
            slidesPerView: 1,
        },
    },
});

/*-------Mobile or PC----------*/

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    IOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.IOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('touch')

    let menuArrows = document.querySelectorAll('.nav__arrow');
    if (menuArrows.length > 0) {
        menuArrows.forEach(item => {
            item.addEventListener("click", () => {
                item.parentElement.classList.toggle('active__arrow');
            })
        })
    }
} else {
    document.body.classList.add('pc')
}

/*--------Smooth scrolling---------*/

let navLinks = document.querySelectorAll('.nav__sub-link[data-goto]');

if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', onNavLinkCLick);
    })

    function onNavLinkCLick(item) {
        const navLink = item.target
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoBlock = document.querySelector(navLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;


            /*--------close burger---------*/
            if (iconButton.classList.contains('active__body')) {
                document.body.classList.remove('active__lock');
                iconButton.classList.remove('active__body');
                headerNav.classList.remove('active__body');
            }
            /*-----------------*/

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            item.preventDefault();
        }
    }
}

/*--------Burger---------*/

const iconButton = document.querySelector('.header__icon')
const headerNav = document.querySelector('.header__nav')
if (iconButton) {
    iconButton.addEventListener('click', () => {
        document.body.classList.toggle('active__lock');
        iconButton.classList.toggle('active__body');
        headerNav.classList.toggle('active__body');
    })
}


/*--------Animation On Scroll---------*/

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(item) {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight + animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight + window.innerHeight / animStart;
            }

            if ((scrollY > animItemOffset - animItemPoint) && (scrollY < (animItemOffset + animItemHeight))) {
                animItem.classList.add('active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('active');
                }
            }

        }
    }

    function offset(item) {
        const rect = item.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}