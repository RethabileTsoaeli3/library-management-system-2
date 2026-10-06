//Days of the week in an array
var day_index = 0;
var days_of_week = [
    "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday", "Sunday"
];

//Create DOM elements for days
const dayHeading = document.createElement("h2");
dayHeading.textContent = "Days calendar";

const dayText = document.createElement("p");
dayText.textContent = days_of_week[day_index];
dayText.style.fontSize = "15px";
dayText.style.fontWeight = "bold";

const dayButton = document.createElement("button");
dayButton.textContent = "Change day";
dayButton.style.marginBottom = "20px";

//A fuction that counts days from the start after the last day
function changeDay() {
    day_index = (day_index + 1) % days_of_week.length;
    dayText.textContent = days_of_week[day_index];
    
}

// add event listener so that the current day is displayed 
dayButton.addEventListener("click", changeDay);

//Append days elements to page
document.body.appendChild(dayHeading);
document.body.appendChild(dayText);
document.body.appendChild(dayButton);

//Months of the year
var month_index = 0;
var months_of_year = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

//Create elements for Months
const monthHeading = document.createElement("h2");
monthHeading.textContent = "Months Calendar";
monthHeading.style.textAlign = "center";


const monthText = document.createElement("p");
monthText.textContent = months_of_year[month_index];
monthText.style.fontSize = "20px";
monthText.style.fontWeight = "bold";
monthText.style.textAlign = "center";

const monthButtonContainer = document.createElement("div");
monthButtonContainer.style.textAlign = "center";

const monthButton = document.createElement("button");
monthButton.textContent = "Change month";

monthButtonContainer.appendChild(monthButton);

//fuctions to cycle month
function changeMonth(){
    month_index = (month_index + 1) % months_of_year.length;
    monthText.textContent = months_of_year[month_index];

}

//add event listener
monthButton.addEventListener("click", changeMonth);

//append months elements to page
document.body.appendChild(monthHeading);
document.body.appendChild(monthText);
document.body.appendChild(monthButtonContainer);


