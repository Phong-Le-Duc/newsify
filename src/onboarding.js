import './style/style.scss';


export default function splash() {
    let splashElement = document.createElement("div")
    splashElement.className = "splash"

    splashElement.innerHTML = `
     
     <img class="splash-logo-symbol" src="src/img/newsify_logo.svg" alt="">
        <h1 class="splash-logo-name">Newsify</h1>

    `
    return splashElement

}

// document.getElementById("app").append(splash())

function showOnboarding() {
    const onboardingElement = document.createElement("div");
    onboardingElement.className = "onboarding";

    onboardingElement.innerHTML = `
    
    <section class="onboarding-carousel">
       
        <div class="onboarding-carousel__slide">
            <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_1.svg" alt="onboard 1">
        </div>
      
        <div class="onboarding-carousel__slide">
        <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_2.svg" alt="onboard 2">
        </div>
      
        <div class="onboarding-carousel__slide">
        <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_3.svg" alt="onboard 3">
        </div>
      
        
        <button class="onboarding-carousel__prev"><i class="fa-solid fa-chevron-left"></i></button>
        <button class="onboarding-carousel__next"><i class="fa-solid fa-chevron-right"></i></button>

        <div class="onboarding-carousel__dots"></div>

    </section>
    
    `;

    document.getElementById("app").append(onboardingElement);


    let onboardingCarousel = document.querySelector(".onboarding-carousel")
    let slides = onboardingCarousel.querySelectorAll(".onboarding-carousel__slide") // .querySelectorAll har en intergreret nodelist (array) og derfor kan du foreach loop
    let slideIndex = 0
    let prev = onboardingCarousel.querySelector(".onboarding-carousel__prev")
    let next = onboardingCarousel.querySelector(".onboarding-carousel__next")
    let dots = onboardingCarousel.querySelector(".onboarding-carousel__dots")
    let changer
    // tom variable til at styre SetInterval


    if (dots) {
        slides.forEach(function (_, i) {
            dots.innerHTML += `<div class="carousel__dot" data-index="${i}"></div>`;
        });
    } else {
        console.error("Dots element not found.");
        return;
    }



    slides.forEach(function (_, i) {
        dots.innerHTML += '<div class="carousel__dot" data-index="' + i + '"></div>'
    })

    function showSlide(index) {
        let selectorDots = document.querySelectorAll(".carousel__dot")
        slides.forEach(function (slide, i) {
            //  slide.style.display = "none" 
            slide.classList.remove("onboarding-carousel__slide--visible")
            selectorDots[i].classList.remove("carousel__dot--active")
        })

        // slides[index].style.display = "block"
        slides[index].classList.add("onboarding-carousel__slide--visible")
        selectorDots[index].classList.add("carousel__dot--active")

    }


    function nextSlide() {
        slideIndex++
        if (slideIndex == slides.length) {
            slideIndex = 0
        }
        showSlide(slideIndex)
    }


    function prevSlide() {
        slideIndex--;
        if (slideIndex == -1) {
            slideIndex = slides.length - 1
        }
        showSlide(slideIndex)
    }
    // TODO: UPDATE SLIDEINDEX variable
    function changeByDot(event) {
        if (event.target != dots) {
            console.log(event.target.dataset.index)
            slideIndex = event.target.dataset.index  //opdatere index ift. knapperne
            showSlide(slideIndex)
        }
    }

    function changeAutomatic() {
        changer = setInterval(function () {
            nextSlide()
        }, 4000)
    }


    // invoke by click
    next.addEventListener("click", nextSlide)
    prev.addEventListener("click", prevSlide)
    dots.addEventListener("click", function (event) {
        changeByDot(event)
    })

    onboardingCarousel.addEventListener("mouseenter", function () {
        clearInterval(changer)
    })

    onboardingCarousel.addEventListener("mouseleave", function () {
        changeAutomatic()
    })

    //invoke
    showSlide(slideIndex)
    changeAutomatic()


}


const splashScreen = splash();
document.getElementById("app").append(splashScreen);

setTimeout(function () {
    splashScreen.classList.add("fade-out");

    splashScreen.addEventListener("animationend", function () {
        console.log("Splash screen faded out!");
        splashScreen.remove();
        showOnboarding();
    }, { once: true });
}, 1600);


