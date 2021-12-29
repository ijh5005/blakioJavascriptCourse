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
    getById("upperCaseLetters").innerHTML = upperCaseLetters;
    getById("lowerCaseLetters").innerHTML = lowerCaseLetters;
    getById("passwordNumbers").innerHTML = passwordNumbers;
    getById("specialCharacters").innerHTML = specialCharacters;
}

const checkUpperCaseLetters = () => {
    const upperCheckbox = getById("upperCaseLettersCheckbox");
    const upperIsChecked = upperCheckbox.checked;
    if (upperIsChecked) {
        acceptableCharacter += upperCaseLetters;
    }
}

const checkLowerCaseLetters = () => {
    const lowerCheckbox = getById("lowerCaseLettersCheckbox");
    const lowerIsChecked = lowerCheckbox.checked;
    if (lowerIsChecked) {
        acceptableCharacter += lowerCaseLetters;
    }
}

const checkNumbers = () => {
    const numberCheckbox = getById("passwordNumbersCheckbox");
    const numberIsChecked = numberCheckbox.checked;
    if (numberIsChecked) {
        acceptableCharacter += passwordNumbers;
    }
}

const checkSpecialCharacters = () => {
    const specialCharactersCheckbox = getById("specialCharactersCheckbox");
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
    getById("passwordBtn").innerText = randomPassword;
}

const copyPassword = () => {
    const text = getById("passwordBtn").innerText;
    navigator.clipboard.writeText(text).then(function () {
        const temp = getById("passwordBtn").innerText;
        getById("passwordBtn").innerText = "Copied!";
        setTimeout(() => {
            getById("passwordBtn").innerText = temp;
        }, 1000)
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

setPasswordOptions();

// challenge: prevent the password from copying when clicked twice
// make checkbox checked when clicing on the characters also