// VARIABLES
var gettingSecondNum = false;
var oper;
var firstNum = null;
var secondNum = null;
var displayingAnswer = false;
var shiftPressed = false;



// HTML ELEMENTS
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const deleteButton = document.getElementById("delete");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equals");
const screenText = document.getElementById("expression");
const tempExpression = document.querySelector(".temp-expression");



// FUNCTIONS
function checkForOverflow() { // called whenever text is being displayed; changes font size
    if (screenText.innerText.length > 18) {
        screenText.style.fontSize = "25px";
    }
    else if (screenText.innerText.length > 13) {
        screenText.style.fontSize = "30px";
    }
    else if (screenText.innerText.length > 10) {
        screenText.style.fontSize = "40px";
    }
    else {
        screenText.style.fontSize = "50px";
    }
}

const displayNumbers = (id) => { // displays numbers on the screen
    let num = id; // sets the number that will be added to screenText equal to the parameter

    if (displayingAnswer) { // checks if an answer is being displayed
        screenText.innerText = ""; // clears the screen
        displayingAnswer = false; // no longer displaying the answer
        gettingSecondNum = false; // getting the first number now
    }

    if (screenText.innerText.length < 16) { // limits screenText length to 16
        screenText.innerText += num;
    }

    checkForOverflow();

    if (gettingSecondNum) { // checks if getting the second number currently
        secondNum = parseInt(screenText.innerText); // sets the second number value to the current screenText value
    }
}

const deleteNumber = () => {
    let currentNumbers = screenText.innerText;
    let updateNumber = "";

    for (let i = 0; i < currentNumbers.length - 1; i++) { // iterates up to the last character in the current number string
        updateNumber += currentNumbers[i];
    }

    screenText.innerText = updateNumber;

    if (displayingAnswer) { // checks if answer is being displayed when deleting numbers
        displayingAnswer = false; // number on the screen now is no longer the answer
        gettingSecondNum = false; // number that was on the screen is now the first number, and we're getting the first number, not the second number
    }

    if (gettingSecondNum) { // checks if we're getting the second number when deleting
        secondNum = parseInt(updateNumber); // sets the second number to the new string
    }
}

const clearNumbers = () => { // resets everything
    screenText.innerText = "";
    tempExpression.innerText = "";
    firstNum = null;
    secondNum = null;
    gettingSecondNum = false;
}

const selectOperation = (id) => {
    if (displayingAnswer) { // checks if the answer is being displayed
        displayingAnswer = false; // answer no longer being displayed
        gettingSecondNum = false; // answer is now the first number
    }

    if (screenText.innerText !== "") { // checks that the first number string isn't empty
        firstNum = parseInt(screenText.innerText); // sets first number to the number on the screen
    }

    if (!gettingSecondNum && firstNum != null) { // checks that we're not getting the second number right now and the first number has a value
        tempExpression.innerText = firstNum; // sets temporary expression in the rop right corner to the first number
        screenText.innerText = "";

        gettingSecondNum = true; // we are now getting the second number
        switch (true) { // add the corresponding operation (depending on the button pressed) to the temporary operation, and sets the operation variable
            case id === "add":
                tempExpression.innerText += " +";
                oper = "add";
                break;
            case id === "subtract":
                tempExpression.innerText += " -";
                oper = "subtract";
                break;
            case id === "multiply":
                tempExpression.innerText += " *";
                oper = "multiply";
                break;
            case id === "divide":
                tempExpression.innerText += " /";
                oper = "divide";
                break;
        }
    }
}

const doOperation = () => {
    if (gettingSecondNum && secondNum != null && !displayingAnswer) { // checks that we are currently getting the second number, the second number has a value, and the answer currently isn't being displayed
        let answer;

        if (oper === "add") {
            answer = firstNum + secondNum;
        }
        if (oper === "subtract") {
            answer = firstNum - secondNum;
        }
        if (oper === "multiply") {
            answer = firstNum * secondNum;
        }
        if (oper === "divide") {
            answer = firstNum / secondNum;
        }

        screenText.innerText = answer; // displays answer on the screen
        checkForOverflow();

        tempExpression.innerText = "";
        displayingAnswer = true; // we are now displaying the answer on the screen
    }
}



// EVENT LISTENERS
numberButtons.forEach((number) => {
    number.addEventListener("click", () => {
        displayNumbers(number.getAttribute("id"));
    });
})

deleteButton.addEventListener("click", deleteNumber);

clearButton.addEventListener("click", clearNumbers);

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectOperation(button.getAttribute("id"));
    });
})

equalButton.addEventListener("click", doOperation)

document.addEventListener("keypress", (key) => { // keyboard events
    if ((key.code === "Equal" && !shiftPressed) || key.code === "Enter" || key.code === "NumpadEnter") {
        doOperation();
    }

    if (key.code === "KeyC") {
        clearNumbers();
    }

    if (key.code === "Digit1" || key.code === "Numpad1") {
        displayNumbers("1");
    }

    if (key.code === "Digit2" || key.code === "Numpad2") {
        displayNumbers("2");
    }

    if (key.code === "Digit3" || key.code === "Numpad3") {
        displayNumbers("3");
    }

    if (key.code === "Digit4" || key.code === "Numpad4") {
        displayNumbers("4");
    }

    if (key.code === "Digit5" || key.code === "Numpad5") {
        displayNumbers("5");
    }

    if (key.code === "Digit6" || key.code === "Numpad6") {
        displayNumbers("6");
    }

    if (key.code === "Digit7" || key.code === "Numpad7") {
        displayNumbers("7");
    }

    if ((key.code === "Digit8" && !shiftPressed) || key.code === "Numpad8") {
        displayNumbers("8");
    }

    if (key.code === "Digit9" || key.code === "Numpad9") {
        displayNumbers("9");
    }

    if (key.code === "Digit0" || key.code === "Numpad0") {
        displayNumbers("0");
    }

    if ((key.code === "Equal" && shiftPressed) || key.code === "NumpadAdd") {
        selectOperation("add");
    }

    if (key.code === "Minus" || key.code === "NumpadSubtract") {
        selectOperation("subtract");
    }

    if ((key.code === "Digit8" && shiftPressed) || key.code === "NumpadMultiply") { // SHIFT KEY CODE?
        selectOperation("multiply");
    }

    if (key.code === "Slash" || key.code === "NumpadDivide") {
        selectOperation("divide");
    }
})

document.addEventListener("keydown", (key) => { // when shift and backspace are pressed
    if (key.code === "ShiftLeft" || key.code === "ShiftRight") {
        shiftPressed = true;
    }

    if (key.code === "Backspace") {
        deleteNumber();
    }
})

document.addEventListener("keyup", (key) => { // when shift is released
    if (key.code === "ShiftLeft" || key.code === "ShiftRight") {
        shiftPressed = false;
    }
})