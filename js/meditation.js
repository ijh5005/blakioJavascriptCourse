let breatheCount = 0;
let breathingRounds = 4;

const resetMeditationApp = () => {
    document.getElementById("breatheOut").classList.add("displayNone");
    document.getElementById("breatheIn").classList.add("displayNone");
    document.getElementById("meditationDirections").classList.add("displayNone");
    document.getElementById("meditationStart").classList.remove("displayNone");
}

const showBreatheOut = () => {
    document.getElementById("breatheOut").classList.remove("displayNone");
    document.getElementById("breatheIn").classList.add("displayNone");
    setTimeout(() => {
        if(breatheCount === breathingRounds){
            resetMeditationApp();
        } else {
            showBreatheIn();
        }
    }, 4000);
}

const showBreatheIn = () => {
    breatheCount++;
    document.getElementById("breatheIn").classList.remove("displayNone");
    document.getElementById("breatheOut").classList.add("displayNone");
    setTimeout(() => {
        showBreatheOut();
    }, 4000);
}

const meditationStart = () => {
    breatheCount = 0;
    document.getElementById("meditationDirections").classList.add("displayNone");
    showBreatheIn();
}

const meditationStartBtn = () => {
    document.getElementById("meditationDirections").classList.remove("displayNone");
    document.getElementById("meditationStart").classList.add("displayNone");
}

// improvements
// add count down for each breathe
// make breathe length avaliable to update by user