const slider = document.querySelector(".slider");
const track = slider.querySelector(".track");

let initialX = 0;
let startX = 0;
let deltaX = 0;
let posX = 0;
let targetX = 0;
let time = 0;
let speed = 0;
let touchStart = 0;
let touchEnd = 0;
let prevDir = 1;
let dir = 1;

function onTouchStart (ev) {
    slider.classList.remove("animate");

    touchStart = Date.now();
    startX = ev.touches[0].clientX;
    initialX = startX;
}

function onTouchMove (ev) {
    deltaX = ev.touches[0].clientX - startX;
    startX = ev.touches[0].clientX;
    posX += deltaX;
    dir = deltaX > 0 ? 1 : -1;

    if (prevDir !== dir) {
        prevDir = dir;
    }

    slider.style.setProperty("--posX", posX + "px");
}

function onTouchEnd (ev) {
    touchEnd = Date.now();
    time = (touchEnd - touchStart) / 1000;
    deltaX = ev.changedTouches[0].clientX - initialX;

    speed = time > 0 ? Math.abs(deltaX / time) : 0;
    targetX = posX + speed * 0.25 * dir;

    slider.classList.add("animate");

    slider.addEventListener("transitionend", () => {
        slider.classList.remove("animate");
    }, { once: true });

    slider.style.setProperty("--speed", speed + "ms");
    slider.style.setProperty("--posX", targetX + "px");

    posX = targetX;
    startX = ev.changedTouches[0].clientX;
}

slider.addEventListener("touchstart", onTouchStart);
slider.addEventListener("touchmove", onTouchMove);
slider.addEventListener("touchend", onTouchEnd);
