const sidebar_pages_links = Array.from(
  document.querySelectorAll(".sidebar_pages_links"),
);

function sidebar_changes(event, id) {
  sidebar_pages_links.map((page_link) => {
    page_link.classList.remove("is_active");
  });

  let pagina = document.getElementById(`link_${id}`).classList.add("is_active");
}
