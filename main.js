// ===============================
// 1. DOM ELEMENT SELECTION
// ===============================

const form = document.querySelector("#registerModal form");
const nameInput = form.querySelector("input[type='text']");
const emailInput = form.querySelector("input[type='email']");
const eventSelect = form.querySelector("select");


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

    // Validation
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
// 5. DISPLAY REGISTRATION COUNT
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
// 6. ACTIVE NAV LINK ON SCROLL
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
// 7. CONSOLE VIEW REGISTRATIONS
// ===============================

window.viewRegistrations = function() {
    console.table(registrations);
};


// 8. SHOW REGISTRATIONS
function showRegistrations() {
    let data = JSON.parse(localStorage.getItem("eventRegistrations")) || [];

    let output = document.getElementById("output");

    if (data.length === 0) {
        output.innerHTML = "<p class='text-muted'>No registrations yet.</p>";
        return;
    }

    let html = "<div class='row'>";

    data.slice(-6).reverse().forEach((item) => {
        html += `
            <div class="col-md-4">
                <div class="card shadow mb-4 p-3 h-100 border-0">
                    
                    <h5 class="text-primary fw-bold">${item.name}</h5>

                    <p class="mb-1">
                        📌 <strong>${item.selectedEvent}</strong>
                    </p>

                    <p class="text-muted small">
                        🕒 ${item.date}
                    </p>

                    <p class="text-secondary">
                        Don't miss this event! Register now and join others.
                    </p>

                    <button 
                        class="btn btn-warning btn-sm register-btn"
                        data-event="${item.selectedEvent}">
                        Register Now
                    </button>

                </div>
            </div>
        `;
    });

    html += "</div>";
    output.innerHTML = html;

    attachRegisterButtons();
}

function attachRegisterButtons() {
    document.querySelectorAll(".register-btn").forEach(btn => {

        btn.addEventListener("click", function () {

            let eventName = this.getAttribute("data-event");

            // Set dropdown value correctly
            document.querySelector("select").value = eventName;

            // Open modal
            const modal = new bootstrap.Modal(document.getElementById('registerModal'));
            modal.show();
        });

    });
}