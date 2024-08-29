const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const results = document.getElementById("results-div");




const checkInput = () => {
  const regex = /\D/ig;
  const input = userInput.value.replace(regex, "");
  const phoneTest = /^(\+?1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/ig;
  if (phoneTest.test(userInput.value)){
    if(input.length === 10){
      results.innerHTML += `<p class="valid">Valid US number: ${userInput.value}</p>`
    }else if (input.length === 11 && input[0] === "1"){
      results.innerHTML += `<p class="valid">Valid US number: ${userInput.value}</p>`
    }else{
      results.innerHTML += `<p class="invalid">Invalid US number: ${userInput.value}</p>`
    }
  }else if (userInput.value === ""){
    alert("Please provide a phone number");
  }else{
    results.innerHTML += `<p class="invalid">Invalid US number: ${userInput.value}</p>`
  }
};

checkBtn.addEventListener("click", () => {
  checkInput();
  userInput.value = "";
});
userInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter"){
    checkInput();
    userInput.value = "";
  }
})
clearBtn.addEventListener("click", () => {
  results.innerText = "";
  userInput.value = "";
});