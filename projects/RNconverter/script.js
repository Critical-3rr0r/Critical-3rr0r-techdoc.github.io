const userInput = document.getElementById("number");
const output = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");
const neumeral = [
  {
    value: "thousands",
    neumerals: ["M"]
  },
  {
    value: "hundreds",
    neumerals: ["C", "CD", "D", "CM"]
  },
  {
    value: "tens",
    neumerals: ["X", "XL", "L", "XC"]
  },
  {
    value: "ones",
    neumerals: ["I", "IV", "V", "IX"]
  }
];
const switcher = (arr, position, place) => {
  let outputText = "";
  let number = parseInt(arr[position]);
  while (number > 0){
    switch (true) {
          case (number === 9):
            outputText += neumeral[place].neumerals[3];
            number -= 9;
            break;
          case (number === 5) || (number === 6) || (number === 7) || (number === 8):
            outputText += neumeral[place].neumerals[2];
            number -= 5;
            break;
          case (number === 4): 
            outputText += neumeral[place].neumerals[1];
            number -= 4;
            break;
          case (number === 1) || (number === 2) || (number === 3):
            outputText += neumeral[place].neumerals[0].repeat(number);
            number = 0;
            break;
        }
  }
      return outputText;
};
function cleanInputString(str) {
  const regex = /[+e.\s]/g;
  return str.replace(regex, '');
}
  

const converter = () => {
  const input = cleanInputString(userInput.value);
  const arr = input.split("");
  let outputText = "";
  let counter = 0;

  switch (arr.length){
    case 4:
        
        arr.forEach(() => {
          
          outputText += switcher(arr, counter, counter);
          counter++;
          })
        counter = 0;
      
      break;
    case 3:
        arr.forEach(() => {
          
          outputText += switcher(arr, counter, counter+1);
          counter++;
          })
        counter = 0;
      break;
    case 2:
        arr.forEach(() => {
          
          outputText += switcher(arr, counter, counter+2);
          counter++;
          })
        counter = 0;
      break;
    case 1:
      arr.forEach(() => {
          
          outputText += switcher(arr, counter, counter+3);
          counter++;
          })
        counter = 0;
      break;
  }
  return outputText;
};
const setOutput = () => {
 
  const number = parseInt(cleanInputString(userInput.value));
  console.log(number);
  if (number >= 4000){
   output.innerHTML = `Please enter a number less than or equal to 3999`; 
  }else if (number <= 0){
    output.innerHTML = `Please enter a number greater than or equal to 1`;
  }
  else if (isNaN(number)){
    output.innerHTML = `Please enter a valid number`;
  }
  else {
  output.innerHTML = `${converter()}`;
  }
};
let hidden = 0;
convertBtn.addEventListener("click", () => {
  if(hidden === 0){
    output.classList.toggle("hidden");
    hidden++;
  }
  setOutput();
});
userInput.addEventListener("keydown", (e) => {
  if(hidden === 0 && e.key === "Enter"){
    output.classList.toggle("hidden");
    hidden++;
  }
  if(e.key === "Enter"){
    setOutput();
  }
});