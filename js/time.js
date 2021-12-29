const addZeroToNumberIfLessThan10 = num => {
    if(num < 10){
        return "0" + num;
    }
    return num;
}

const getHr = () => {
    const time = new Date();
    //time.getHours() returns value 0-23 for the current hour
    let hour = time.getHours();
    if(hour === 0){
        // at 12am the hour equals 0
        hour = 12;
    } else if(hour > 12){
        hour = hour  - 12;
    }
    return addZeroToNumberIfLessThan10(hour);
}

const getMin = () => {
    const time = new Date();
    //returns value 0-59 for the current minute of the hour
    let minute = time.getMinutes();
    return addZeroToNumberIfLessThan10(minute);
}

const getSec = () => {
    const time = new Date();
    //returns value 0-59 for current second of the minute
    let second = time.getSeconds();
    return addZeroToNumberIfLessThan10(second);
}

const getTimeOfDay = () => {
    const time = new Date();
    const hr = time.getHours();
    if(hr > 11) {
        return "PM";
    }
    return "AM";
}

const setHTML = (hour, minute, second, timeOfDay) => {
    getById("hr").innerHTML = hour;
    getById("min").innerHTML = minute;
    getById("sec").innerHTML = second;
    getById("dayTime").innerHTML = timeOfDay;
}

const setDate = () => {
    let hour = getHr();
    let minute = getMin();
    let second = getSec();
    let timeOfDay = getTimeOfDay();
    setHTML(hour, minute, second, timeOfDay);
}

setInterval(() => {
    setDate();
}, 1000);

// nice to have
// change time color to orange when in the AM