async function updatePlayerCount(config) {
  const playerCount = document.getElementById("player-count");

  fetch("https://api.mcstatus.io/v2/status/java/" + config.ipAddress)
    .then((response) => response.json())
    .then((data) => {
      const playersOnline = data.players.online;

      playerCount.textContent = playersOnline.toLocaleString();
    })
    .catch((error) => {
      console.error(`Failled to fetch player count for ${config.ipAddress}:`, error);
    });
}

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

    if (item.newTab) {
      anchor.target = "_blank";
    }

    listItem.appendChild(anchor);
    navUl.appendChild(listItem);
  });

  // Player Count
  const updatePlayerCountInterval = config.updatePlayerCountInterval ?? 30;

  updatePlayerCount(config);

  setInterval(async () => {
    await updatePlayerCount(config)
  }, updatePlayerCountInterval * 1000);

  // IP Address
  const ipAddress = document.getElementById("ip-address");
  const hoverText = document.getElementById("hover-text");
  const copiedText = document.getElementById("copied-text");

  ipAddress.textContent = config.ipAddress;

  ipAddress.addEventListener("click", () => {
    if (copiedText.classList.contains("opacity-100")) {
      return;
    }

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

  // Theme
  const {
    navbar: navbarTheme,
    playerCount: playerCountTheme,
    ipAddress: ipAddressTheme
  } = config.theme;

  const navbarElement = document.querySelector("nav");
  const navbarUlElement = navbarElement.querySelector("ul");

  navbarElement.classList.add(`bg-[${navbarTheme.background}]`);
  navbarElement.classList.add(`border-[${navbarTheme.border}]`);
  navbarUlElement.classList.add(`text-[${navbarTheme.text}]`);

  const playerCountElement = document.getElementById("player-count-text");

  playerCountElement.classList.add(`text-[${playerCountTheme.text}]`);

  const ipAddressElement = document.getElementById("ip-address");

  ipAddressElement.classList.add(`bg-[${ipAddressTheme.background}]`);
  ipAddressElement.classList.add(`border-[${ipAddressTheme.border}]`);
  ipAddressElement.classList.add(`text-[${ipAddressTheme.text}]`);

  const clickToCopyHoverElement = document.getElementById("hover-text");
  const hoverTextTheme = ipAddressTheme.clickToCopy.hover;

  clickToCopyHoverElement.classList.add(`bg-[${hoverTextTheme.background}]`);
  clickToCopyHoverElement.classList.add(`border-[${hoverTextTheme.border}]`);
  clickToCopyHoverElement.classList.add(`text-[${hoverTextTheme.text}]`);

  const clickToCopyCopiedElement = document.getElementById("copied-text");
  const copiedTextTheme = ipAddressTheme.clickToCopy.copied;

  clickToCopyCopiedElement.classList.add(`bg-[${copiedTextTheme.background}]`);
  clickToCopyCopiedElement.classList.add(`border-[${copiedTextTheme.border}]`);
  clickToCopyCopiedElement.classList.add(`text-[${copiedTextTheme.text}]`);
});
