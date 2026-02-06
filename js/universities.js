document.querySelector(".back-top")
  ?.addEventListener("click", e => {
    e.preventDefault();
    topFunction();
  });

const backTopBtn = document.querySelector(".back-top");

window.addEventListener("scroll", function () {
  if (!backTopBtn) return;
  backTopBtn.style.display =
    document.documentElement.scrollTop > 100 ? "inline-block" : "none";
});

function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const staticUniversities = [
  {
    name: "William Carey University",
    location: "Nongmensong, Shillong"
  },
  {
    name: "Martin Luther Christian University",
    location: "Nongrah, Shillong"
  },
  {
    name: "Institute of Chartered Financial Analysts of India",
    location: "Danakgre, Tura"
  },
  {
    name: "University of Science and Technology Meghalaya",
    location: "Techno City, Ri-Bhoi"
  },
  {
    name: "Mahatma Gandhi University",
    location: "Khanapara, Ri-Bhoi"
  },
  {
    name: "Maharashtra Institute of Technology University of Meghalaya",
    location: "Mawkasiang, New Shillong"
  },
  {
    name: "North East Adventist University",
    location: "Khliehtyrshi, West Jaintia Hills"
  }
];

function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function renderUniversities(list) {

  const tbody = document.getElementById("universities-body");
  tbody.innerHTML = "";

  list.forEach((u, index) => {

    const tr = document.createElement("tr");

    tr.appendChild(createCell(index + 1));
    tr.appendChild(createCell(u.name));
    tr.appendChild(createCell(u.location));

    tbody.appendChild(tr);
  });
}



async function loadUniversities() {
  try {
    const res = await fetch("/api/public/universities");
    if (!res.ok) throw new Error("API Failed");
    const data = await res.json();
    renderUniversities(data);
  } catch (err) {
    // console.warn("Using static university list");
    renderUniversities(staticUniversities);
  }
}

document.addEventListener("DOMContentLoaded", loadUniversities);

function handleRoute() {

  const body = document.body;
  const sections = document.querySelectorAll("main > section");

  body.classList.remove("page-mode");

  sections.forEach(s => {
    s.classList.remove("active-page");
  });

  const aboutPage = document.getElementById("about-page");
  if (aboutPage) {
    aboutPage.classList.add("hidden-section");
  }
  const hash = window.location.hash;

  if (hash === "#about-page") {
    body.classList.add("page-mode");
    if (aboutPage) {
      aboutPage.classList.remove("hidden-section");
      aboutPage.classList.add("active-page");
    }
    window.scrollTo({ top: 0 });
    return;
  }
  document.getElementById("about")?.classList.remove("hidden-section");
}




window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);


document.addEventListener("click", function (e) {

  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  if (href.startsWith("#")) {

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      history.pushState(null, "", href);

      handleRoute();
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      const navToggle = document.getElementById("nav-toggle");
      if (navToggle) navToggle.checked = false;

      return;
    }
  }


// Alert for external links
  if (
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {

    try {

      const url = new URL(href);

      if (url.origin !== window.location.origin) {

        const confirmed = confirm(
          "You are leaving the official website of MPURB.\n" +
          "Do you want to continue?"
        );

        if (!confirmed) {
          e.preventDefault();
          e.stopPropagation();
        }

      }

    } catch (err) {
      e.preventDefault();
    }
  }

});
