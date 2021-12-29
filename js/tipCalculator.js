const allFieldsEntered = (cost, tip, numberOfPeople) => {
    return cost.length && tip.length && numberOfPeople.length
}

const setTip = (cost, tip, numberOfPeople) => {
    cost = parseFloat(cost);
    tip = parseFloat(tip);
    numberOfPeople = parseFloat(numberOfPeople);
    const payPerPerson = (cost + cost * (tip / 100)) / numberOfPeople;
    getById("pay").innerText = "$" + payPerPerson.toFixed(2);
}

const calculateTip = () => {
    let cost = getById("cost").value;
    let tip = getById("tip").value;
    let numberOfPeople = getById("numberOfPeople").value;
    if(allFieldsEntered(cost, tip, numberOfPeople)){
        setTip(cost, tip, numberOfPeople);
    }
}

// improvements
// prevent the letting e from being input
// division by zero
// if user enters a decimal for percentage change tip formula