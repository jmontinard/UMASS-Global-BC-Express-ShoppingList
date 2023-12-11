document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("postForm");
    
    postForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        
        const data = {
            name,
            price
        };
        
        fetch("http://localhost:8010/shop/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                // Handle a successful response, e.g., show a success message
                console.log("POST request succeeded");
            } else {
                // Handle an error response, e.g., show an error message
                console.error("POST request failed");
            }
        })
        .catch((error) => {
            // Handle network error, e.g., show a connection error message
            console.error("Network error", error);
        });
    });
});
