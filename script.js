document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
        document.getElementById("contactForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {
                name: document.getElementsByName("name")[0].value,
                email: document.getElementsByName("email")[0].value,
                message: document.getElementsByName("message")[0].value
            };

            fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById("responseMessage").innerText = data.message;
                    document.getElementById("contactForm").reset();
                })
                .catch(error => {
                    console.error("Error:", error);
                    document.getElementById("responseMessage").innerText = "Failed to send message.";
                });
        });