const slider = document.querySelector(".slider");
const trackEl = slider.querySelector(".track");
const valueEl = document.getElementById("value");

const tickGap = 20;

let animationFrameId = null;
let elapsedTime = 0;
let prevTime = 0;
let totalTime = 2000;

let value = 0;
let initialX = 0;
let currentX = 0;
let deltaX = 0;
let posX = 0;
let targetX = 0;
let time = 0;
let speed = 0;
let touchStart = 0;
let touchEnd = 0;
let dir = 1;

function onTouchStart (ev) {
    slider.classList.remove("animate");

    touchStart = Date.now();
    currentX = ev.touches[0].clientX;
    initialX = currentX;

    cancelAnimationFrame(animationFrameId);
}

function onTouchMove (ev) {
    deltaX = Math.floor(ev.touches[0].clientX - currentX);
    currentX = Math.floor(ev.touches[0].clientX);
    posX -= Math.floor(deltaX);
    dir = deltaX > 0 ? -1 : 1;

    valueEl.textContent = ((posX) / tickGap).toFixed(0);

    slider.style.setProperty("--posX", -posX + "px");
}

function onTouchEnd (ev) {
    touchEnd = Date.now();
    time = (touchEnd - touchStart) / 1000;
    deltaX = ev.changedTouches[0].clientX - initialX;

    speed = speed + time > 0 ? Math.abs(deltaX / time) * 0.5 : 0;
    speed = Math.min(speed, 180);
    targetX = Math.floor(posX + speed * 0.25 * dir);

    prevTime = 0;
    elapsedTime = 0;
    animationFrameId = requestAnimationFrame(animatePosition);

    currentX = ev.changedTouches[0].clientX;
    valueEl.textContent = ((posX) / 20).toFixed(0);
}

function animatePosition (timeStamp = 0) {
    if (speed < 0.01) {
        return cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(animatePosition);

    posX += speed * 0.05 * dir;

    elapsedTime += (timeStamp - prevTime);
    prevTime = timeStamp;
    let progress = Math.min(elapsedTime / totalTime, 1.0);

    speed = speed * (1 - Math.pow(progress * 0.25, 3));
    console.log("Speed: %d Progress: %d", speed, progress);

    valueEl.textContent = ((posX) / tickGap).toFixed(0);
    slider.style.setProperty("--posX", -posX + "px");
}

slider.addEventListener("touchstart", onTouchStart);
slider.addEventListener("touchmove", onTouchMove);
slider.addEventListener("touchend", onTouchEnd);
