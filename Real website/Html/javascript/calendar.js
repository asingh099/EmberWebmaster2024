const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {

    let //determines which day of the week the 1st day of the month falls on
        firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
        //gives the total number of days in the current month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        //finds which day of the week the last date of the month is on
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        //gives the last day of the eprevious month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    let liTag = ""; //liTag is the content that fills up the <ul class="days"> in HTML

    //fills in the days of the previous month that are in the first row of the current month
    for (let i = firstDayofMonth; i > 0; i--) { 
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    //generates elements for each day of the current month
    for (let i = 1; i <= lastDateofMonth; i++) { 
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="day ${isToday}" data-day="${i}">${i}</li>`;
    }

    //fills in the days of the next month that are in the last row of the current month
    for (let i = lastDayofMonth; i < 6; i++) { 
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    //update the calendar header
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    // Add event listener to each day
    document.querySelectorAll(".days li").forEach(day => {
        day.addEventListener("click", function () {
            // Ignore inactive days
            if (this.classList.contains("inactive")) return;

            // Get selected date
            let selectedDay = this.innerText;
            let selectedMonth = months[currMonth];
            let selectedYear = currYear;

            // Check the current page and update the confirmation text
            let confirmationText = "";
            if (window.location.pathname.includes("reservationPage")) {
                confirmationText = `Do you want to book a reservation on ${selectedMonth} ${selectedDay}, ${selectedYear}?`;
            } else if (window.location.pathname.includes("tourPage")) {
                confirmationText = `Do you want to book a tour on ${selectedMonth} ${selectedDay}, ${selectedYear}?`;
            }

            // Update confirmation box text
            document.getElementById("confirmation-text").innerText = confirmationText;

            // Show the confirmation box
            document.getElementById("confirmation-box").style.display = "block";
        });
    });

    // Add event listener to the Cancel button
    document.getElementById("cancel-btn").addEventListener("click", function () {
        // Hide the confirmation box when Cancel is clicked
        document.getElementById("confirmation-box").style.display = "none";
    });
};

// Call the function initially to render the calendar
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});