const allFieldsEntered = (cost, tip, numberOfPeople) => {
    return cost.length && tip.length && numberOfPeople.length
}

const setTip = (cost, tip, numberOfPeople) => {
    cost = parseFloat(cost);
    tip = parseFloat(tip);
    numberOfPeople = parseFloat(numberOfPeople);
    const payPerPerson = (cost + cost * (tip / 100)) / numberOfPeople;
    document.getElementById("pay").innerText = "$" + payPerPerson.toFixed(2);
}

const calculateTip = () => {
    let cost = document.getElementById("cost").value;
    let tip = document.getElementById("tip").value;
    let numberOfPeople = document.getElementById("numberOfPeople").value;
    if(allFieldsEntered(cost, tip, numberOfPeople)){
        setTip(cost, tip, numberOfPeople);
    }
}

// improvements
// prevent the letting e from being input
// division by zero
// if user enters a decimal for percentage change tip formula