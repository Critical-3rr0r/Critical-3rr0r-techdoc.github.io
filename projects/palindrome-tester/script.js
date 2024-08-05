const dromeInput = document.getElementById("text-input");
const dromeBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

// input cleaner using regex to filter all non-alphaneumeric input
function cleanInput (input){
  const regex = /[^a-zA-Z0-9]/g;
  return input.replace(regex, "").toLowerCase();
}

// Palindrome checking function. stores initial input, clears previous result, cleans input and stores seperately, checks if cleaned input is empty and throws error if so, shows result in <p> element with some logic to determine if palindrome.
function getDrome(input){  
  console.log("ran");
  const initialInput = input;
  result.innerHTML = "";
  const isPalindrome = cleanInput(input);
  if(isPalindrome === ""){
    alert("Please input a value");
    return;
  }
  result.innerHTML = `<strong>${initialInput}</strong> ${isPalindrome === [...isPalindrome].reverse().join('') ? "is" : "is not"} a palindrome` 
}
// button and key event listeners to run palindrome checks
dromeBtn.addEventListener("click", () => {
  getDrome(dromeInput.value);
  dromeInput.value = "";
})

dromeInput.addEventListener("keydown", (k) => {
  if (k.keyIdentifier == 'U+000A' || k.keyIdentifier == 'Enter' || k.keyCode == 13)
  {
    getDrome(dromeInput.value);
    dromeInput.value = "";
  }
})

