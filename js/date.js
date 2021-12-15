const setDate = () => {
    const time = new Date();
    let hour = time.getHours(); //returns value 0-23 for the current hour
    let minute = time.getMinutes(); //returns value 0-59 for the current minute of the hour
    let second = time.getSeconds(); //returns value 0-59 for current second of the minute
    let timeOfDay = "";
    if(hour > 11){
        timeOfDay = "PM";
        const offsetFrom12 = hour  - 12;
        if(offsetFrom12 !== 0){
            hour = offsetFrom12;
        }
    } else {
        timeOfDay = "AM";
    }

    if(hour === 0){
        hour = 12;
    }

    if(hour < 10){
        hour = "0" + hour;
    }

    if(minute < 10){
        minute = "0" + minute;
    }

    if(second < 10){
        second = "0" + second;
    }

    document.getElementById("hr").innerHTML = hour;
    document.getElementById("min").innerHTML = minute;
    document.getElementById("sec").innerHTML = second;
    document.getElementById("dayTime").innerHTML = timeOfDay;
}

setInterval(() => {
    setDate();
}, 1000);

// nice to have
// change time color to orange when in the AM