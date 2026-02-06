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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 90; 
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            const navToggle = document.getElementById("nav-toggle");
            if (navToggle) navToggle.checked = false;
        }
    });
});

document.addEventListener("DOMContentLoaded", loadUniversities);


const openBtn = document.getElementById("openAboutModal");
const closeBtn = document.getElementById("closeAboutModal");
const modal = document.getElementById("aboutModal");

openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
