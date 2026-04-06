// ===============================
// 1. DOM ELEMENT SELECTION
// ===============================
const form = document.querySelector("#registerModal form");
const nameInput = form.querySelector("input[type='text']");
const emailInput = form.querySelector("input[type='email']");
const eventSelect = form.querySelector("select");


// ===============================
// 2. FORM SUBMISSION (SEND TO BACKEND)
// ===============================
form.addEventListener("submit", async function(e) {
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

    try {
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                event: selectedEvent
            })
        });

        const msg = await res.text();
        alert(msg);

        form.reset();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();

        

    } catch (err) {
        console.log(err);
        alert("Error submitting form");
    }
});


// ===============================
// 3. EMAIL VALIDATION
// ===============================
function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email.toLowerCase());
}


// ===============================
// 4. SHOW LATEST 6 REGISTRATIONS
// ===============================
async function showRegistrations() {
    let output = document.getElementById("output");

    output.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch("http://localhost:3000/recent");
        const data = await res.json();

        if (data.length === 0) {
            output.innerHTML = "<p>No registrations yet.</p>";
            return;
        }

        let html = "<div class='row'>";

        data.forEach(item => {
            html += `
            <div class="col-md-4">
                <div class="card shadow mb-4 p-3 border-0">
                    <h5 class="text-primary fw-bold">${item.name}</h5>
                    <p>📌 <strong>${item.event}</strong></p>
                    <p class="text-muted small">
                        🕒 ${new Date(item.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
            `;
        });

        html += "</div>";
        output.innerHTML = html;

    } catch (err) {
        console.log(err);
        output.innerHTML = "<p>Error loading data</p>";
    }
}


// ===============================
// 5. ACTIVE NAV LINK ON SCROLL
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


