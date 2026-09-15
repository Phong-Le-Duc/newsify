import './style/style.scss';
import Button from './components/button/button';
import { initTheme } from './theme';

initTheme();

export default function splash() {
    let splashElement = document.createElement("div");
    splashElement.className = "splash";

    splashElement.innerHTML = `
        <img class="splash-logo-symbol" src="src/img/newsify_logo.svg" alt="">
        <h1 class="splash-logo-name">Newsify</h1>
    `;
    return splashElement;
}

function showOnboarding() {
    const onboardingElement = document.createElement("div");
    onboardingElement.className = "onboarding";

    onboardingElement.innerHTML = `
        <section class="onboarding-carousel">
            <div class="onboarding-carousel__slide">
                <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_1.svg" alt="onboard 1">
                <div class="onboarding-carousel__slide__text">
                    <h1>Stay Connected,<br> Everywhere, Anytime</h1>
                    <p>Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.</p>
                </div>
            </div>
            <div class="onboarding-carousel__slide">
                <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_2.svg" alt="onboard 2">
                <div class="onboarding-carousel__slide__text">
                    <h1>Become a Savvy <br> Global Citizen.</h1>
                    <p>Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!</p>
                </div>
            </div>
            <div class="onboarding-carousel__slide">
                <img class="onboarding-carousel__slide__image" src="src/img/Onboarding_3.svg" alt="onboard 3">
                <div class="onboarding-carousel__slide__text">
                    <h1>Enhance your News <br> Journey Now!</h1>
                    <p>Be part of our dynamic community and contribute your insights and participate in enriching conversations.</p>
                </div>
            </div>
            <div class="onboarding-carousel__buttons"></div>
            <div class="onboarding-carousel__dots"></div>
        </section>
    `;

    const skipButton = Button("Skip");
    const continueButton = Button("Continue", "button--green");

    const buttonsContainer = onboardingElement.querySelector('.onboarding-carousel__buttons');
    buttonsContainer.appendChild(skipButton);
    buttonsContainer.appendChild(continueButton);

    skipButton.addEventListener("click", function () {
        localStorage.setItem('hasVisited', 'true'); // set true for if not visited...
        window.location.href = "login.html";
    });

    continueButton.addEventListener("click", function () {
        slideIndex++;
        if (slideIndex >= slides.length) {
            localStorage.setItem('hasVisited', 'true'); // set true for if not visited...
            window.location.href = "login.html";
        } else {
            showSlide(slideIndex);
        }
    });

    document.getElementById("app").append(onboardingElement);

    const onboardingCarousel = onboardingElement.querySelector(".onboarding-carousel");
    const slides = onboardingCarousel.querySelectorAll(".onboarding-carousel__slide");
    const dots = onboardingCarousel.querySelector(".onboarding-carousel__dots");

    let slideIndex = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "carousel__dot";
        dot.dataset.index = i;
        dots.appendChild(dot);
    });

    const selectorDots = onboardingCarousel.querySelectorAll(".carousel__dot");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("onboarding-carousel__slide--visible");
            selectorDots[i].classList.remove("carousel__dot--active");
        });

        slides[index].classList.add("onboarding-carousel__slide--visible");
        selectorDots[index].classList.add("carousel__dot--active");
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            window.location.href = "index.html";
        } else {
            showSlide(slideIndex);
        }
    }

    function changeByDot(event) {
        if (event.target.classList.contains("carousel__dot")) {
            slideIndex = parseInt(event.target.dataset.index);
            showSlide(slideIndex);
        }
    }

    selectorDots.forEach(dot => dot.addEventListener("click", changeByDot));

    showSlide(slideIndex);
}

const splashScreen = splash();
document.getElementById("app").append(splashScreen);

setTimeout(function () {
    splashScreen.classList.add("fade-out");

    splashScreen.addEventListener("animationend", function () {
        console.log("Splash screen faded out!");
        splashScreen.remove(); // Remove the splash screen from the DOM

        // Wait for one frame to ensure styles are loaded before injecting onboarding
        requestAnimationFrame(() => {
            showOnboarding();
        });
    }, { once: true });
}, 2000);