document.addEventListener("DOMContentLoaded", () => {
  // Subtle parallax effect on mouse move
  // const hero = document.querySelector(".hero");
  // const orb = document.querySelector(".glow-orb");

  // document.addEventListener("mousemove", (e) => {
  //   const x = (e.clientX / window.innerWidth - 0.5) * 20;
  //   const y = (e.clientY / window.innerHeight - 0.5) * 20;

  //   if (hero) hero.style.transform = `translate(${x}px, ${y}px)`;
  //   if (orb) orb.style.transform = `translate(calc(-50% + ${-x * 2}px), calc(-50% + ${-y * 2}px))`;
  // });

  // Simple email form handling
  const form = document.querySelector("#notify-form");
  const input = form.querySelector("input");
  const button = form.querySelector("button");
  const buttonText = button.querySelector("span");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const originalText = buttonText.textContent;
    buttonText.textContent = "Joining...";
    button.style.opacity = 0.7;

    fetch("https://formsubmit.co/ajax/admin@datum-works.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: input.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        buttonText.textContent = "You're on the list.";
        button.style.backgroundColor = "#33ffaa";
        button.style.color = "#000";
        button.style.opacity = 1;
        input.value = "";
        input.disabled = true;
      })
      .catch((error) => {
        console.error("Error:", error);
        buttonText.textContent = "Error. Try again.";
        button.style.backgroundColor = "#ff3333";
        setTimeout(() => {
          buttonText.textContent = originalText;
          button.style.backgroundColor = "";
          button.style.opacity = 1;
        }, 3000);
      });
  });
});
