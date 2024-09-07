
let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let cashKey = {
  "PENNY": .01,
  "NICKLE": .05,
  "DIME": .1,
  "QUARTER": .25,
  "ONE": 1.00,
  "FIVE": 5.00,
  "TEN": 10.00,
  "TWENTY": 20.00,
  "ONE HUNDRED": 100.00
};

const total = document.getElementById("price");
const input = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const keypad = document.getElementsByClassName("btn");
const cashOnHand = document.getElementById("cash-drawer");
const changeDue = document.getElementById("change-due");
total.innerHTML = `$${price}`;
let totalCOH = 0;
let enoughCurrency = true;
const updateCash = () => {
  cashOnHand.innerHTML = `<p><strong>Change in drawer:</strong></p>`;
  let x = 0;
  cid.forEach((num) => {
    cashOnHand.innerHTML += `<p>${cid[x][0]}: $${cid[x][1]}</p>`
    x++
  });
}
updateCash();
// function to update totalCOH variable
const updateTotalCOH = () => {
  let currCOH = 0;
  cid.forEach((denom) => {
    currCOH += denom[1];
  });
  totalCOH = parseFloat(currCOH.toFixed(2));
};
// Determines if the cash on hand is more than the cash given minus the price
const totalLessThanCOH = (inputValue) => {
  updateTotalCOH();
  if(parseFloat((inputValue - price).toFixed(2)) > totalCOH){
    return false
  }else if(inputValue - price === 0){
    return 0;
  }else{
    return true;
  }
  
};
const subtractLargest = (inputValue) => {
  let changeObj = {};
  let tempCid = cid;
  let changeValueArr = [];
  // Sets a change value equal to the cash given minus the price
  let change = inputValue - price;
  //checks if the change is less than the cash on hand
  if(totalLessThanCOH(inputValue)){
    
    // running loop starting at the end of the cashKey array and subtracting the value of that key from the change until the cid value is 0
    for(let i = cid.length -1; i >= 0; i--){
      let key = Object.keys(cashKey);
      // while loop continues to subtract current value at position i from change until change is less than current value 
      
      while(change >= cashKey[key[i]]){
        // checks if the Cid value will be brought below zero and breaks from while loop if that is the case to move on to next highest value      
        if(tempCid[i][1] - cashKey[key[i]] >= 0){
          console.log("working")
          change -= cashKey[key[i]];
          tempCid[i][1] -= cashKey[key[i]];
          tempCid[i][1] = parseFloat(tempCid[i][1].toFixed(2));
          console.log(tempCid[i][1]);
          console.log(cashKey[key[i]]);
          if(change > .009 && change < .01){
          
          change = parseFloat(change.toFixed(2));
        }   
          // checks if the change object has the subtracted value key. adds it if not. incraments it if it does
          if(changeObj.hasOwnProperty(key[i])){
            changeObj[key[i]] += cashKey[key[i]];
            
          }else{
            changeObj[key[i]] = cashKey[key[i]];
          }
        }else{
          break
        }
        
      }
      if(changeObj[key[i]]){
        changeObj[key[i]] = parseFloat(changeObj[key[i]].toFixed(2));
      }
    }
  }
  //returns object containing values subtracted from largest to smallest and updates totalCOH
  //checks if the value of the change in changeObj is equal to the
  console.log(changeObj);
  changeValueArr = Object.values(changeObj)
  let changeTotal = 0;
  changeValueArr.forEach((num) => changeTotal += num);
  console.log(Math.floor(changeTotal * 100) / 100, "changeTotal");
  console.log(Math.floor((inputValue - price) * 100) / 100, "price");
  console.log(Math.floor(changeTotal * 100) / 100 === Math.floor((inputValue - price) * 100) / 100);
  if(parseFloat(changeTotal.toFixed(2)) === parseFloat((inputValue - price).toFixed(2))){
    cid = tempCid;
    
    updateTotalCOH();
    enoughCurrency = true;
    return changeObj;
  }else{
    updateTotalCOH();
    enoughCurrency = false;
    return changeObj;
  }
};

const updateDisplay = (inputValue) =>{
  console.log(inputValue);
  console.log(price);
  console.log(cid);
  let changeObj = {};
  let changeName = [];
  let changeValue = [];
  let count = 0;
  changeObj = subtractLargest(inputValue);
  console.log(changeObj);
  if(inputValue > price && enoughCurrency){
    changeName = Object.keys(changeObj);
    changeValue = Object.values(changeObj);
    console.log(totalCOH + " COH");
    if(totalCOH <= 0){
      console.log("closed");
      changeDue.style.display = "block";
      changeDue.innerText = "Status: CLOSED";
      changeName.forEach((name) => {
        changeDue.innerHTML += `<p>${name}: $${changeValue[count]}</p>`;
        count++;
      });
    }else{
      console.log("open");
      changeDue.style.display = "block";
      changeDue.innerText = "Status: OPEN";
      changeName.forEach((name) => {
        changeDue.innerHTML += `<p>${name}: $${changeValue[count]}</p>`;
        count++;
      });
    }
  }else if(inputValue === price){
    changeDue.style.display = "block";
    console.log("NCD");
    changeDue.innerHTML = `No change due - customer paid with exact cash`;
  }else if(inputValue < price){
    console.log("Insufficient");
    alert("Customer does not have enough money to purchase the item");
  }else{
    console.log("tooMuch");
    changeDue.style.display = "block";
    changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }
};



//sets the behavior of the "Purchase" button
purchaseBtn.addEventListener("click", () => {
    const value = Number.parseFloat(input.value).toFixed(2);;
  updateDisplay(value);
  updateCash();
})

input.addEventListener("keydown", (e) => {
    if (event.key === "Enter") {
        const value = Number.parseFloat(input.value).toFixed(2);;
        updateDisplay(value);
        updateCash();
    }
})



// Sets the behavior onClick for each button based on their value to allow for keypad entry into input. unable to do .X numbers for some odd reason
Object.keys(keypad).forEach((elem) => {
  keypad[elem].addEventListener("click", () => {
    let count = Number(elem);
    if(elem < 9){
      input.value += count + 1;
    }else if (elem === "9"){
      input.value += 0;
    }else if (elem === "10"){
      input.value += ".0";
    }else{
      let inputString = Number(input.value.toString().slice(0, -1));
      input.value = inputString;
      if(input.value === "0"){
        input.value = "";
      }
    // bug in code disallows removal of numbers after decimal while retaining decimal. unable to fix at this time.
    }
  });
});