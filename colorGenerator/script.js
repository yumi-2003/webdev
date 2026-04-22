const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

paletteContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("copy-btn")) {
    const hexValue = event.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        showCopySuccess(event.target);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (event.target.classList.contains("color")) {
    const hexValue =
      event.target.nextElementSibling.querySelector(".hex-value").textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        showCopySuccess(
          event.target.nextElementSibling.querySelector(".copy-btn"),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");

    element.style.color = "#4a5568";
  }, 1500);
}

function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

//generate random hex color
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  // 0-15
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updatePaletteDisplay(colors) {
  const colorsBoxex = document.querySelectorAll(".color-box");

  colorsBoxex.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// get different paletter every page refresh
// generatePalette();
