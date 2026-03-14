
// ===============================
// 1. DOM ELEMENT SELECTION
// ===============================

const form = document.querySelector("#registerModal form");
const nameInput = form.querySelector("input[type='text']");
const emailInput = form.querySelector("input[type='email']");
const eventSelect = form.querySelector("select");
const eventCards = document.querySelectorAll(".event-card");
const registerButtons = document.querySelectorAll(".event-card .btn");


// ===============================
// 2. LOAD EXISTING REGISTRATIONS
// ===============================

let registrations = JSON.parse(localStorage.getItem("eventRegistrations")) || [];


// ===============================
// 3. FORM SUBMISSION EVENT
// ===============================

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const selectedEvent = eventSelect.value;

    // Simple Validation
    if (name === "" || email === "") {
        alert("Please fill all fields!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Enter valid email address!");
        return;
    }

    // Save Data
    const registrationData = {
        name,
        email,
        selectedEvent,
        date: new Date().toLocaleString()
    };

    registrations.push(registrationData);
    localStorage.setItem("eventRegistrations", JSON.stringify(registrations));

    alert("Registration Successful for " + selectedEvent + " 🎉");

    form.reset();

    // Close Modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();

    updateRegistrationCount();
});


// ===============================
// 4. EMAIL VALIDATION FUNCTION
// ===============================

function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email.toLowerCase());
}


// ===============================
// 5. VIEW DETAILS BUTTON CLICK
// ===============================

registerButtons.forEach(button => {
    button.addEventListener("click", function() {
        const eventTitle = this.closest(".card").querySelector(".card-title").innerText;
        const eventDesc = this.closest(".card").querySelector(".card-text").innerText;

        alert("Event: " + eventTitle + "\n\nDetails: " + eventDesc);
    });
});


// ===============================
// 6. CLICK CARD AUTO SELECT EVENT
// ===============================

eventCards.forEach(card => {
    card.addEventListener("click", function() {
        const title = this.querySelector(".card-title").innerText;
        eventSelect.value = title;
    });
});


// ===============================
// 7. DISPLAY REGISTRATION COUNT
// ===============================

function updateRegistrationCount() {
    let footer = document.querySelector("footer .container");

    let counter = document.getElementById("registrationCounter");

    if (!counter) {
        counter = document.createElement("p");
        counter.id = "registrationCounter";
        footer.appendChild(counter);
    }

    counter.innerHTML = "Total Registrations: <strong>" + registrations.length + "</strong>";
}

updateRegistrationCount();


// ===============================
// 8. ACTIVE NAV LINK ON SCROLL
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


// ===============================
// 9. CONSOLE VIEW REGISTRATIONS
// ===============================

window.viewRegistrations = function() {
    console.table(registrations);
};

