// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert(
        "Thank you for contacting me! " +
        "I will get back to you soon."
    );

    contactForm.reset();

});


// ================= NAVIGATION =================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {

            item.style.color = "#333";

        });

        this.style.color = "#5b5bd6";

    });

});
