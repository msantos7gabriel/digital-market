const sidebarPagesLinks = document.querySelectorAll(".sidebar_pages_links");
const pageContent = document.getElementById("page-content");

async function loadPage(page, link) {
  sidebarPagesLinks.forEach((pageLink) => {
    pageLink.classList.remove("is_active");
  });

  link.classList.add("is_active");

  try {
    const response = await fetch(`${page}.html`);

    if (!response.ok) {
      pageContent.innerHTML = "Não foi possível carregar esta página.";
      return;
    }

    pageContent.innerHTML = await response.text();

    document.querySelector("#page-style")?.remove();

    document.querySelector("#page-script")?.remove();

    if (page === "catalogo") {
      const stylesheet = document.createElement("link");
      stylesheet.id = "page-style";
      stylesheet.rel = "stylesheet";
      stylesheet.href = "../css/catalogo.css";
      document.head.appendChild(stylesheet);

      const script = document.createElement("script");
      script.id = "page-script";
      script.src = "../js/catalogo.js";
      pageContent.appendChild(script);

    } else if (page === "produtos") {
      const stylesheet = document.createElement("link");
      stylesheet.id = "page-style";
      stylesheet.rel = "stylesheet";
      stylesheet.href = "../css/produtos.css";
      document.head.appendChild(stylesheet);

      const script = document.createElement("script");
      script.id = "page-script";
      script.src = "../js/produtos.js";
      pageContent.appendChild(script);
    }
  } catch (error) {
    pageContent.innerHTML = "Não foi possível carregar esta página.";
  }
}

sidebarPagesLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    loadPage(link.dataset.page, link);
  });
});

loadPage("inicio", document.querySelector('[data-page="inicio"]'));
