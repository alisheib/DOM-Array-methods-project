const main =document.querySelector("#main")
const addUserBtn =document.querySelector("#add-user")
const doubleBtn =document.querySelector("#double")
const showMillionairesBtn =document.querySelector("#show-millionaires")
const sortBtn =document.querySelector("#sort")
const calculateWealthBtn =document.querySelector("#calculate-wealth")

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


// Fetch random user and add money
async function getRandomUser() {
   const res = await fetch("https://randomuser.me/api");
   const data = await res.json();
   const user = data.results[0];
   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 100000)
   }
    addData(newUser)
}

// Double everyones money
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money *2}
    })
    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);// descendng order
    updateDOM();
}

// Filter only millionaires
function showMillionaires () {
    data = data.filter(user => user.money > 1000000)
    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong><h3>`;

    main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

//Update DOM 
function updateDOM(providedData = data) {
 // Clear main div   
 main.innerHTML = "<h2><strong>Person</strong> wealth</h2>";

 providedData.forEach(item => {
     const element = document.createElement("div");
     element.classList.add("person");
     element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
     main.appendChild(element);
 });
}

// Format number as money  - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return "$"+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click" , calculateWealth)