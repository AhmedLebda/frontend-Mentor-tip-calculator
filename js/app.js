// DOM variables
const inputs = document.querySelectorAll("input");
const bill = document.getElementById("bill");
const peopleCount = document.getElementById("people");
const tipOptions = document.querySelector(".tip-wrapper");
const errorMsg = document.querySelector(".error-msg");
const tipPerPerson = document.querySelector(".tip-amount");
const totalPerPerson = document.querySelector(".total");
const resetbtn = document.getElementById("reset");
let tip = 0;

// Forcing all inputs to accept only numbers and checking the number format
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.id === "bill") {
      if (!Number(bill.value)) {
        bill.classList.add("input-error");
      } else {
        bill.classList.remove("input-error");
      }
    }

    if (input.id === "people") {
      peopleCountChecker();
      input.value = input.value.replace(/[^0-9]/, "");
    }
    input.value = input.value.replace(/[^0-9.]/, "");

    // Updating the result when user changes any of the inputs value
    calculate(+bill.value, +peopleCount.value, tip);
  });

  // Removing error styles on bill input blur after checking the value
  bill.addEventListener("blur", () => {
    if (!Number(bill.value)) {
      bill.classList.add("input-error");
    } else {
      bill.classList.remove("input-error");
    }
  });
});

// Updating tip value when user chooses an option
tipOptions.addEventListener("click", (e) => {
  // Reseting active styles and custom values when user changes the option
  [...tipOptions.children].forEach((child) => {
    child.classList.remove("active");
  });
  tipOptions.children[tipOptions.children.length - 1].value = "";
  tip = "";

  if (e.target.tagName.toLowerCase() === "button") {
    tip = e.target.dataset.value / 100;
    e.target.classList.add("active");
  } else if (e.target.tagName.toLowerCase() === "input") {
    e.target.addEventListener("input", () => {
      tip = e.target.value / 100;
      calculate(+bill.value, +peopleCount.value, tip);
    });
  }

  // Updating the result when user chooses a tip option
  calculate(+bill.value, +peopleCount.value, tip);
});

// Reseting all options and values
resetbtn.addEventListener("click", () => {
  tipPerPerson.innerHTML = "$0.00";
  totalPerPerson.innerHTML = "$0.00";
  bill.value = "";
  peopleCount.value = "";
  errorMsg.innerHTML = "";
  inputs.forEach((input) => input.classList.remove("input-error"));
  [...tipOptions.children].forEach((child) => child.classList.remove("active"));
});

// Checks if user entered a valid number of people
function peopleCountChecker() {
  if (Number(peopleCount.value) < 1) {
    peopleCount.classList.add("input-error");
    errorMsg.innerHTML = "Can't be zero";
    return false;
  } else {
    peopleCount.classList.remove("input-error");
    errorMsg.innerHTML = "";
  }
}

// Calculates the total and tip amount per person
function calculate(bill = 0, people, tip = 0) {
  if (!people || !bill) {
    return false;
  }
  const totalTip = bill * tip;
  tipPerPerson.innerHTML = "$" + (totalTip / people).toFixed(2);
  totalPerPerson.innerHTML = "$" + ((bill + totalTip) / people).toFixed(2);
}
