document.addEventListener("DOMContentLoaded", async () => {
  const config = await fetch("config.json")
    .then((response) => response.json());

  // Navbar
  const navbarItems = config.navbarItems;
  const navUl = document.querySelector("nav ul");
  navUl.innerHTML = "";

  navbarItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "hover:text-gray-200 cursor-pointer transition-colors";
    const anchor = document.createElement("a");
    anchor.href = item.url;
    anchor.textContent = item.text;
    listItem.appendChild(anchor);
    navUl.appendChild(listItem);
  });

  // IP Address
  const ipAddress = document.getElementById("ip-address");
  const hoverText = document.getElementById("hover-text");
  const copiedText = document.getElementById("copied-text");

  ipAddress.addEventListener("click", () => {
    const textToCopy = ipAddress.textContent;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        hoverText.classList.remove("group-hover:opacity-100");
        hoverText.classList.add("opacity-0");

        copiedText.classList.remove("opacity-0");
        copiedText.classList.add("opacity-100");

        setTimeout(() => {
          copiedText.classList.remove("opacity-100");
          copiedText.classList.add("opacity-0");

          hoverText.classList.add("group-hover:opacity-100");
        }, 1500);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  });
});
