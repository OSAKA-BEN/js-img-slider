const track = document.getElementById("image-track");

window.onmousedown = event => {
    track.dataset.mouseDownAt = event.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = event => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        nextPercentage = Math.min(nextPercentage, 0) 
        nextPercentage = Math.max(nextPercentage, -100);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`},
        {duration: 1200, fill: "forwards"});

    for(const image of track.getElementsByClassName("image")) { 
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`},
            { duration: 1200, fill: "forwards"});
    }
}