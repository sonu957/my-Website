//for banner image display
document.querySelectorAll('[data-background]').forEach(el => {
  el.style.backgroundImage = `url(${el.getAttribute('data-background')})`;
});




// document.addEventListener('DOMContentLoaded', function () {

//     // Set background images
//     document.querySelectorAll('.banner-4__item').forEach(el => {
//         el.style.backgroundImage = `url(${el.getAttribute('data-background')})`;
//     });

//     // Initialize Swiper
//     const bannerSwiper = new Swiper('.banner-4__slide', {
//         loop: true,
//         speed: 1000,
//         effect: 'creative',
//         creativeEffect: {
//             prev: {
//                 shadow: true,
//                 translate: ['-20%', 0, -1],
//             },
//             next: {
//                 translate: ['100%', 0, 0],
//             },
//         },
//         navigation: {
//             nextEl: '.banner-4__button .next',
//             prevEl: '.banner-4__button .prev',
//         },
//         autoplay: {
//             delay: 5000,
//         },
//     });

// });

//for header scroll

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header-sticky');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > header.offsetHeight) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});



//for gallery
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Initialize Isotope
    var grid = document.querySelector('.project-items');
    var iso = new Isotope(grid, {
        itemSelector: '.project-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.6s'
    });

    // Filter buttons
    var filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            var filterValue = btn.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });
        });
    });

    // Initialize GLightbox
    const lightbox = GLightbox({
        selector: '.glightbox',
        loop: true,
        touchNavigation: true,
        zoomable: true,
        autoplayVideos: false,
    });
});

// for about us


document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".about-us-4");
    const counter = document.querySelector(".odometer");

    if (!section || !counter) return;

    let started = false;

    // =========================
    // ADD ANIMATION CLASSES (SAFE)
    // =========================
    function prepareAnimation() {
        const items = section.querySelectorAll(
            ".section-2__subtitle, .section-2__title, .about-us-4__content p, .about-us-4__item, .rr-btn"
        );

        items.forEach(el => el.classList.add("animate-item"));

        const img = section.querySelector(".about-us-4__media");
        if (img) img.classList.add("animate-img");
    }

    prepareAnimation();

    // =========================
    // CREATE DIGITS (ONLY INSIDE SPAN)
    // =========================
    function createDigits(length) {
        counter.innerHTML = "";

        for (let i = 0; i < length; i++) {
            let digit = document.createElement("div");
            digit.className = "digit";

            let inner = document.createElement("div");
            inner.className = "digit-inner";

            for (let n = 0; n <= 9; n++) {
                let num = document.createElement("div");
                num.innerText = n;
                inner.appendChild(num);
            }

            digit.appendChild(inner);
            counter.appendChild(digit);
        }
    }

    // =========================
    // UPDATE DIGITS (ROLL UP)
    // =========================
    function updateDigits(num) {
        let str = num.toString().padStart(counter.children.length, "0");

        str.split("").forEach((d, i) => {
            let inner = counter.children[i].querySelector(".digit-inner");
            inner.style.transform = "translateY(-" + (d * 50) + "px)";
        });
    }

    // =========================
    // COUNTER START
    // =========================

function startCounter() {
    let target = parseInt(counter.getAttribute("data-count")) || 25;

    // create digits ONLY ONCE
    counter.innerHTML = "";

    let digitsCount = target.toString().length;

    for (let i = 0; i < digitsCount; i++) {

        let digit = document.createElement("div");
        digit.className = "digit";

        let inner = document.createElement("div");
        inner.className = "digit-inner";

        // create 0–9
        for (let n = 0; n <= 9; n++) {
            let num = document.createElement("div");
            num.innerText = n;
            inner.appendChild(num);
        }

        digit.appendChild(inner);
        counter.appendChild(digit);
    }

    let count = 0;

    let interval = setInterval(() => {

        let str = count.toString().padStart(digitsCount, "0");

        str.split("").forEach((d, i) => {
            let inner = counter.children[i].querySelector(".digit-inner");
            inner.style.transform = "translateY(-" + (d * 50) + "px)";
        });

        if (count >= target) {
            clearInterval(interval);

            // FIXED PLUS (NO OVERLAP)
            let plus = document.createElement("span");
            plus.innerText = "+";
            plus.className = "plus";
            counter.appendChild(plus);
        }

        count++;

    }, 80);
}

    // =========================
    // TRIGGER ON SCROLL
    // =========================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {

                section.classList.add("active"); // trigger text + image
                startCounter();                  // start counter

                started = true;
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);

});


// service section


// counting service


// document.addEventListener("DOMContentLoaded", () => {

//     const sections = document.querySelectorAll(".experience");

//     const observer = new IntersectionObserver((entries, observer) => {

//         entries.forEach(entry => {

//             if (entry.isIntersecting) {

//                 startCounting(entry.target);

//                 observer.unobserve(entry.target); // run once only
//             }
//         });

//     }, { threshold: 0.4 });

//     sections.forEach(section => observer.observe(section));
// });


// // ----------- COUNTING FUNCTION -----------
// function startCounting(section) {

//     const counters = section.querySelectorAll(".odometer");

//     counters.forEach(counter => {

//         let target = parseInt(counter.getAttribute("data-count")) || 0;

//         let current = 0;

//         let speed = 25; // lower = faster animation

//         let interval = setInterval(() => {

//             current++;

//             if (current >= target) {
//                 clearInterval(interval);
//                 counter.innerText = target + "+";
//             } else {
//                 counter.innerText = current;
//             }

//         }, speed);

//     });
// }


document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".experience");

    if (!section) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                // Start counter
                startCounters(entry.target);

                // Add animation class
                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }
        });

    }, { threshold: 0.4 });

    observer.observe(section);
});


// -------- COUNTER FUNCTION --------
function startCounters(section) {

    const counters = section.querySelectorAll(".odometer");

    counters.forEach(counter => {

        let target = parseInt(counter.getAttribute("data-count")) || 0;

        let current = 0;

        let speed = 20; // smooth speed

        let step = Math.ceil(target / 100); // dynamic step

        let interval = setInterval(() => {

            current += step;

            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            counter.innerText = current;

        }, speed);

    });
}



// ----------- COUNTING FUNCTION -----------
function startCounting(section) {

    const counters = section.querySelectorAll(".odometer");

    counters.forEach(counter => {

        let target = parseInt(counter.getAttribute("data-count")) || 0;

        let current = 0;

        let speed = 25; // lower = faster animation

        let interval = setInterval(() => {

            current++;

            if (current >= target) {
                clearInterval(interval);
                counter.innerText = target;
            } else {
                counter.innerText = current;
            }

        }, speed);

    });
}


// portfolio

// testimonials


document.addEventListener("DOMContentLoaded", () => {

    const testimonialSwiper = new Swiper(".testimonial-3__active", {

        loop: true,               // continuous loop
        speed: 800,               // smooth animation speed
        spaceBetween: 30,         // gap between slides
        autoplay: {
            delay: 3000,          // auto slide every 3 sec
            disableOnInteraction: false // keeps autoplay after click
        },

        navigation: {
            nextEl: ".testimonial-3__slider__arrow-next",
            prevEl: ".testimonial-3__slider__arrow-prev"
        },

        effect: "slide",          // smooth sliding effect

        grabCursor: true,         // cursor animation

        breakpoints: {

            320: {
                slidesPerView: 1
            },

            768: {
                slidesPerView: 1
            },

            1024: {
                slidesPerView: 1
            }

        }

    });

});


// banner

let bgSlides = document.querySelectorAll(".bg-slide");
let floatImgs = document.querySelectorAll(".float");

let index = 0;

function changeSlide() {
  // Remove active
  bgSlides.forEach(slide => slide.classList.remove("active"));
  floatImgs.forEach(img => img.classList.remove("active"));

  // Next index
  index = (index + 1) % bgSlides.length;

  // Add active
  bgSlides[index].classList.add("active");
  floatImgs[index].classList.add("active");
}

// Initial active
bgSlides[0].classList.add("active");
floatImgs[0].classList.add("active");

// Auto change every 3 seconds
setInterval(changeSlide, 3000);


// about page circular 

// service section

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".service-details");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add("active");
            }
        });
    }, {
        threshold: 0.2
    });

    if (section) {
        observer.observe(section);
    }

});

document.addEventListener("DOMContentLoaded", function () {

  const section = document.querySelector(".service-details");
  const image = document.querySelector(".left-animate-img");
  const content = document.querySelector(".service-details__content");
  const sidebar = document.querySelector(".sidebar");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // Trigger animations
        image.classList.add("active");
        content.classList.add("active");
        sidebar.classList.add("active");

      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(section);
});


