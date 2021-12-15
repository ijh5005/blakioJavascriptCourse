// uppercase letters
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// lowercase letters
const lowerCaseLetters = upperCaseLetters.toLowerCase();

// numbers
const passwordNumbers = "1234567890";

// special characters
const specialCharacters = "!@#$%^&*()-_=+~";

let acceptableCharacter = "";

let passwordLength = 10;

// set the password checkbox options
const setPasswordOptions = () => {
    document.getElementById("upperCaseLetters").innerHTML = upperCaseLetters;
    document.getElementById("lowerCaseLetters").innerHTML = lowerCaseLetters;
    document.getElementById("passwordNumbers").innerHTML = passwordNumbers;
    document.getElementById("specialCharacters").innerHTML = specialCharacters;
}

const checkUpperCaseLetters = () => {
    const upperCheckbox = document.getElementById("upperCaseLettersCheckbox");
    const upperIsChecked = upperCheckbox.checked;
    if (upperIsChecked) {
        acceptableCharacter += upperCaseLetters;
    }
}

const checkLowerCaseLetters = () => {
    const lowerCheckbox = document.getElementById("lowerCaseLettersCheckbox");
    const lowerIsChecked = lowerCheckbox.checked;
    if (lowerIsChecked) {
        acceptableCharacter += lowerCaseLetters;
    }
}

const checkNumbers = () => {
    const numberCheckbox = document.getElementById("passwordNumbersCheckbox");
    const numberIsChecked = numberCheckbox.checked;
    if (numberIsChecked) {
        acceptableCharacter += passwordNumbers;
    }
}

const checkSpecialCharacters = () => {
    const specialCharactersCheckbox = document.getElementById("specialCharactersCheckbox");
    const specialCharactersIsChecked = specialCharactersCheckbox.checked;
    if (specialCharactersIsChecked) {
        acceptableCharacter += specialCharacters;
    }
}

const getRandomIndex = maxNum => {
    const index = Math.floor(Math.random() * maxNum);
    return index;
}

const generatePassword = () => {
    acceptableCharacter = "";
    let randomPassword = "";
    checkUpperCaseLetters();
    checkLowerCaseLetters();
    checkNumbers();
    checkSpecialCharacters();

    if(acceptableCharacter.length === 0){
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const index = getRandomIndex(acceptableCharacter.length);
        const randomCharacter = acceptableCharacter[index];
        randomPassword += randomCharacter;
    }
    document.getElementById("passwordBtn").innerText = randomPassword;
}

const copyPassword = () => {
    const text = document.getElementById("passwordBtn").innerText;
    navigator.clipboard.writeText(text).then(function () {
        const temp = document.getElementById("passwordBtn").innerText;
        document.getElementById("passwordBtn").innerText = "Copied!";
        setTimeout(() => {
            document.getElementById("passwordBtn").innerText = temp;
        }, 1000)
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

setPasswordOptions();

// challenge: prevent the password from copying when clicked twice
// make checkbox checked when clicing on the characters also