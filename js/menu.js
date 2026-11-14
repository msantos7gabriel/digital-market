const sidebarPagesLinks = document.querySelectorAll(".sidebar_pages_links");
const pageContent = document.getElementById("page-content");

async function loadPage(page, link) {
  const response = await fetch(`${page}.html`);

  if (!response.ok) {
    pageContent.innerHTML = "Não foi possível carregar esta página.";
    return;
  }

  pageContent.innerHTML = await response.text();

  document.querySelector("#page-style")?.remove();

  if (page === "catalogo") {
    const stylesheet = document.createElement("link");
    stylesheet.id = "page-style";
    stylesheet.rel = "stylesheet";
    stylesheet.href = "../css/catalogo.css";
    document.head.appendChild(stylesheet);

    const script = document.createElement("script");
    script.src = "../js/catalogo.js";
    pageContent.appendChild(script);
  }

  sidebarPagesLinks.forEach((pageLink) => {
    pageLink.classList.remove("is_active");

    const icon = pageLink.querySelector("object");
    icon.data = icon.data.replace("_active.svg", "_deactive.svg");
  });

  link.classList.add("is_active");

  const activeIcon = link.querySelector("object");
  activeIcon.data = activeIcon.data.replace("_deactive.svg", "_active.svg");
}

sidebarPagesLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage(link.dataset.page, link);
  });
});

loadPage("inicio", document.querySelector('[data-page="inicio"]'));
