let string = "";
const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

// Common function to handle inputs (keyboard + button)
function handleInput(value) {
  if (value === "=") {
    try {
      string = eval(string);
      display.value = string;
    } catch {
      display.value = "Error";
      string = "";
    }
  } else if (value === "C") {
    string = "";
    display.value = "";
  } else if (value === "X") {
    string = string.slice(0, -1);
    display.value = string;
  } else {
    string += value;
    display.value = string;
  }
}

// Button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-key");
    handleInput(value);
    btn.blur(); // remove focus
  });
});

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  const allowedKeys = "0123456789+-*/.%";
  if (allowedKeys.includes(key)) {
    handleInput(key);
    highlightButton(key);
  } else if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
    highlightButton("=");
  } else if (key === "Backspace") {
    handleInput("X");
    highlightButton("X");
  } else if (key === "Escape") {
    handleInput("C");
    highlightButton("C");
  }
});

// Button highlight on key press
function highlightButton(key) {
  const btn = document.querySelector(`.button[data-key="${key}"]`);
  if (btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
  }
}
