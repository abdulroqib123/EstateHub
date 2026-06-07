const navBar = document.getElementById("nav-bar");

const anchors = [
  { text: "Dashboard", href: "dashboard.html" },
  { text: "Add Property", href: "add-property.html" },
  { text: "Login/Signup", href: "../auth/login.html" },
];

anchors.forEach((link) => {
  const a = document.createElement("a");
  a.classList.add("anchor-nav-bar");
  a.textContent = link.text;
  a.href = link.href;
  navBar.appendChild(a);
});
