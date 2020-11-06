console.log("Hello!")

var calendarParentEl = $(".calendarParent > .calendarContainer");

// Set current day in header
$("#currentDay").text(moment().format("dddd, MMMM YYYY"));

// Handle coloring of event inputs

// for each container

for (let i = 0; i < calendarParentEl.length; i++) {
    console.log("For loop!");

    var eventTime = $(calendarParentEl[i]).children("span").attr("data-hour")
    var eventEl = $(calendarParentEl[i]).find(".eventInput")


    console.log(`${eventTime} vs. moment=${moment().format("H")}`);

    if (eventTime == moment().format("H")) {
        eventEl.css("background-color", "red");
    } else if (eventTime > moment().format("H")) {
        eventEl.css("background-color", "lightBlue");
    } else {
        eventEl.css("background-color", "lightGray");
    }
}


// Handle saving and storage of event data



// Event Handlers
