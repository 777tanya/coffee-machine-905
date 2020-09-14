"use strict"

let progressBar = document.querySelector(".progress-bar");
let bigCup = document.querySelector(".cup");
let state = "idle"










function makeCoffee(name, price, element) {
  if (state !="idle") {
    return;
  }
  let balance = document.querySelector(".form-control");
  if (+balance.value >= price) {
    balance.value -= price; //balance.value = balance.value - price
    balance.style.backgroundColor = "";
  changeDisplayText(`Ваш ${name} готовится`);
  state = "cooking";
  let coffeeCup = element.querySelector("img");
  let cupSrc = coffeeCup.getAttribute("src");
  console.log(cupSrc);
  bigCup.setAttribute("src", cupSrc);
  bigCup.style.display = "inline";
    
    let readyPercent = 0;
    let cookingInterval = setInterval(function() {
      readyPercent++;
      //console.log(readyPercent);
      bigCup.style.opacity = readyPercent + "%";
      progressBar.style.width = readyPercent + "%"; 
      changeDisplayText(`Ваш ${name} готовится. ${readyPercent}%`);
      if(readyPercent >= 100) {
        clearInterval(cookingInterval);
        changeDisplayText(`Ваш ${name} готов!`);
        bigCup.style.cursor = "pointer"; //при наведении курсора показывает палец
        bigCup.onclick = function () {
          takeCoffee();
        }
      }
    }, 30)
    
  }else {
    balance.style.backgroundColor = "red";
    changeDisplayText("Недостаточно средств");
    }
  }
  
  function takeCoffee() {
    bigCup.style.display = "none";
    bigCup.style.opacity = 0;
    bigCup.style.cursor = "";
    
    
    progressBar.style.width = 0;
    
    changeDisplayText("Выберите кофе");
    bigCup.onclick = null;
    state = "idle";
  }
  
  
  
  function changeDisplayText(message) {
    let displayText = document.querySelector(".display-test");
    displayText.innerHTML = message;
  }
  
//-------------Drag'n'Drop------------------
let money = document.querySelectorAll(".money img");
for(let i = 0; i < money.lenght; i++) {
 let bill = money[i];  
}
for(let bill of money) {
 bill.onmousedown = function(event) {
  console.log(event);
   takeMoney(event, bill);
 }
}

function takeMoney(event, bill) {
  event.preventDefault();
  
let mouseX = event.clientX;
let mouseY = event.clientY;

bill.style.transform = "rotate(90deg)";

let billCoords = bill.getBoundingClientRect();
console.log(billCoords);

bill.style.position = "absolute";
bill.style.top = mouseY - billCoords.width/2 + "px"; 
bill.style.left = mouseX - billCoords.heigth/2 + "px"; 

window.onmousemove = function(event) {
  let mouseX = event.clientX;
  let mouseY = event.clientY; 
  bill.style.top = mouseY - billCoords.width/2 + "px"; 
  bill.style.left = mouseX - billCoords.height/2 + "px"; 
  }
bill.onmouseup = function(event) {
  window.onmousemove = null;
  console.log( inAtm(bill) );
  if ( inAtm(bill) ) {
    let balance = document.querySelector(".form-control");
    balance.value = +balance.value + +bill.dataset.cost;
    bill.remove();
    } 
  }
}
function inAtm(bill) {
  let atm = document.querySelector(".atm");
  let atmCoords = atm.getBoundingClientRect();
  let billCoords = bill.getBoundingClientRect();

let atmLeftTopX = atmCoords.x;
let atmLeftTopY = atmCoords.y;

let atmLeftBottomX = atmCoords.x;
let atmLeftBottomY = atmCoords.y + atmCoords.height/3;

let atmRightTopX = atmCoords.x + atmCoords.width;
let atmRightTopY = atmCoords.y;

let billLeftTopX = billCoords.x;
let billLeftTopY = billCoords.y;

let billRightTopX = billCoords.x + billCoords.width;
let billRightTopY = billCoords.y;

//console.log([atmLeftTopX, atmLeftTopY, atmLeftBottomX, atmLeftBottomY, atmRightTopX, atmRightTopY, billLeftTopX, billLeftTopY, billRightTopX, billRightTopY])

if(billLeftTopX > atmLeftTopX
&& billLeftTopY > atmLeftTopY
&& billLeftTopY < atmLeftBottomY
&& billRightTopX < atmRightTopX
) {
  return true;
} else {
  return false;
  }
}
