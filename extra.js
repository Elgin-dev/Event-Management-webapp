// EXTRA FEATURE 1
// Search events

const searchInput = document.getElementById("eventSearch");

searchInput.addEventListener("keyup", function () {

    const searchValue = searchInput.value.toLowerCase();

    const events = document.querySelectorAll(".event-card");

    events.forEach(event => {

        const title = event.querySelector(".card-title").innerText.toLowerCase();

        if (title.includes(searchValue)) {
            event.style.display = "block";
        } 
        else {
            event.style.display = "none";
        }

    });

});




// ===============================
// EVENT COUNTDOWN TIMER
// ===============================

const eventDate = new Date("June 15, 2026 10:00:00").getTime();

const timer = setInterval(function () {

    const now = new Date().getTime();

    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("eventTimer").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {

        clearInterval(timer);

        document.getElementById("eventTimer").innerHTML = "Event Started 🚀";

    }

}, 1000);

// ===============================
// MUSIC FESTIVAL TIMER
// ===============================

const musicDate = new Date("July 1, 2026 18:00:00").getTime();

setInterval(function(){

    const now = new Date().getTime();
    const distance = musicDate - now;

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("musicTimer").innerHTML =
    days+"d "+hours+"h "+minutes+"m "+seconds+"s";

},1000);



// ===============================
// CORPORATE EVENT TIMER
// ===============================

const corporateDate = new Date("August 10, 2026 09:00:00").getTime();

setInterval(function(){

    const now = new Date().getTime();
    const distance = corporateDate - now;

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("corporateTimer").innerHTML =
    days+"d "+hours+"h "+minutes+"m "+seconds+"s";

},1000);