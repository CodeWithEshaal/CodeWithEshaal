fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    if (typeof updateCartCount === "function") {
      updateCartCount();
    }
  })
  .catch(error => console.error("Error loading navbar:", error));
