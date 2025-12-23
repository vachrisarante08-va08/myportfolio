const texts = [
  "Virtual Assistant",
  "Social Media Manager",
  "Website Developer"
];

let index = 0;       // which sentence
let charIndex = 0;   // which character
let currentText = "";
let isDeleting = false;
const speed = 50;   // typing speed
const eraseSpeed = 5; // deleting speed
const delay = 1000;  // delay before deleting

function typeEffect() {
  const typingElement = document.getElementById("rotating-title");
  currentText = texts[index];

  if (!isDeleting) {
    // typing forward
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => isDeleting = true, delay);
    }

  } else {
    // deleting
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length; // next word
    }
  }

  setTimeout(typeEffect, isDeleting ? eraseSpeed : speed);
}

typeEffect();

const topBtn = document.getElementById("topBtn");

// show button when scrolling
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

// scroll back to top
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const scriptURL =                       
      "https://script.google.com/macros/s/AKfycbw23CCx2uOcbYgT2xvroPZqW130wA2pbF-imi_MPxIZWZ51mvAsG0_Kys3h6AoUw49i/exec";
      const form = document.forms["submit-to-google-sheet"];
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        var formData = new FormData(form);
        var ex = document.getElementById("ex").checked;

        if (ex) {
          formData.append("ex", "Yes");
        } else {
          formData.append("ex", "No");
        }

        fetch(scriptURL, { method: "POST", body: formData })
          .then((response) => {
            swal("Done", "Submitted Successfully.", "success");
          })
          .catch((error) => {
            swal("Error", "Something went wrong. please try again!", "error");
          });
      });
