let breatheCount = 0;
let breathingRounds = 4;

const resetMeditationApp = () => {
    getById("breatheOut").classList.add("displayNone");
    getById("breatheIn").classList.add("displayNone");
    getById("meditationDirections").classList.add("displayNone");
    getById("meditationStart").classList.remove("displayNone");
}

const showBreatheOut = () => {
    getById("breatheOut").classList.remove("displayNone");
    getById("breatheIn").classList.add("displayNone");
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
    getById("breatheIn").classList.remove("displayNone");
    getById("breatheOut").classList.add("displayNone");
    setTimeout(() => {
        showBreatheOut();
    }, 4000);
}

const meditationStart = () => {
    breatheCount = 0;
    getById("meditationDirections").classList.add("displayNone");
    showBreatheIn();
}

const meditationStartBtn = () => {
    getById("meditationDirections").classList.remove("displayNone");
    getById("meditationStart").classList.add("displayNone");
}

// improvements
// add count down for each breathe
// make breathe length avaliable to update by user