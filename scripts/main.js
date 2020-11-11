console.log("Hello!")

var calendarBlocksEl = $("#calendarParent > .calendarContainer");
var eventData = [];


// Set current day in header
$("#currentDay").text(moment().format("dddd, MMMM YYYY"));

// Handle coloring & updating of event inputs/text
function setColors() {

    for (let i = 0; i < calendarBlocksEl.length; i++) {

        var eventTime = Number($(calendarBlocksEl[i]).children("span").attr("data-hour"));
        var eventEl = $(calendarBlocksEl[i]).find(".eventInput");

        if (eventTime == moment().format("H")) {
            eventEl.css("background-color", "lightgreen");
        } else if (eventTime > moment().format("H")) {
            eventEl.css("background-color", "lightBlue");
        } else {
            eventEl.css("background-color", "lightGray");
        }
    }
}

// Setup initial javascript object for storing calendar data
function initializeData() {

    var hour;
    var text;

    // If we don't have data stored
    if (localStorage.getItem("eventData") === null) {

        for (let i = 0; i < calendarBlocksEl.length; i++) {
            hour = $(calendarBlocksEl.get(i)).children(".time").attr("data-hour");
            text = ""

            eventData.push({
                hour,
                text
            });

            console.log(hour, text)
        } 

        localStorage.setItem("eventData", JSON.stringify(eventData));
    } else {textHistoryUpdate()}
}

// Pull local storage and populate on calendar
function textHistoryUpdate() {
    console.log("I found history! Time to update...")
    eventData = JSON.parse(localStorage.getItem("eventData"));

    // Set each input to the local storage text
    for (let i = 0; i < calendarBlocksEl.length; i++) {
        $(calendarBlocksEl.get(i)).find(".eventInput").val(eventData[i].text);
    } 

}

// Handle saving and storage of event data
function save(event) {
    event.preventDefault();

    // Get the target div
    var timeSlotDivEl = $(event.target).parent(".calendarContainer");

    // Get the array number that you are referencing
    var arrayPos = calendarBlocksEl.index(timeSlotDivEl);

    // Save text from div child to local storage
    var eventDataStorage = JSON.parse(localStorage.getItem("eventData"));
    eventDataStorage[arrayPos].text = timeSlotDivEl.find(".eventInput").val();
    localStorage.setItem("eventData", JSON.stringify(eventDataStorage));

}

// Perform these Functions at the Beginning
initializeData();
setColors();

// Event Handlers
$("#calendarParent").on("click", ".icon", save);
$("#calendarParent").submit(save);
