"use strict"

function makeCoffee(name, price) {
  let balance = document.querySelector(".form-control");
  if (+balance.value >= price) {
    balance.value -= price; //balance.value = balance.value - price
    balance.style.backgroundColor = "";
    changeDisplayText('Ваш ${name} готовится');
  }else {
    balance.style.backgroundColor = "red";
    changeDisplayText("Недостаточно средств");
    }
  }
  
function changeDisplayText(massage) {
  let displayText = document.querySelector(".display-text");
  displayText.innerHTML = message;
}
    
