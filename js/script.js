const smeContainer = document.getElementById("smeContainer");
const smeSearchInput = document.getElementById("smeSearchInput");
const smeEmptyMessage = document.getElementById("smeEmptyMessage");
const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const navLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("section[id], footer[id]");
const productsContainer = document.getElementById("productsContainer");

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", isDark);
        themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    if (themeToggleIcon) {
        themeToggleIcon.textContent = isDark ? "L" : "D";
    }
}

const savedTheme = localStorage.getItem("tasik-theme");

if (savedTheme) {
    applyTheme(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";

        localStorage.setItem("tasik-theme", nextTheme);
        applyTheme(nextTheme);
    });
}

function setActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
}

if (navToggle && header) {
    navToggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("nav-open");

        navToggle.setAttribute("aria-expanded", isOpen);
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const targetId = link.getAttribute("href").replace("#", "");

        setActiveNavLink(targetId);
        header.classList.remove("nav-open");

        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
});

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveNavLink(entry.target.id);
            }
        });
    }, {
        rootMargin: "-35% 0px -50% 0px",
        threshold: 0
    });

    pageSections.forEach(section => sectionObserver.observe(section));
}

function renderSmes(smes) {
    if (!smeContainer || !smeEmptyMessage) {
        return;
    }

    smeContainer.innerHTML = "";

    smes.forEach(sme => {

        const card = document.createElement("div");

        card.classList.add("sme-card");

        card.innerHTML = `

            <img src="${sme.image}" alt="${sme.name}">

            <div class="sme-content">

                <h3>${sme.name}</h3>

                <p class="sme-category">${sme.category}</p>

                <p>${sme.description}</p>

               <a href="${sme.profile}">View Profile</a>

            </div>
        `;

        smeContainer.appendChild(card);

    });

    smeEmptyMessage.style.display = smes.length ? "none" : "block";
}

if (smeContainer && smeSearchInput && smeEmptyMessage) {
    fetch("data/sme.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load SME data");
        }

        return response.json();
    })

    .then(data => {

        renderSmes(data);

        smeSearchInput.addEventListener("input", () => {

            const keyword = smeSearchInput.value.trim().toLowerCase();

            const filteredSmes = data.filter(sme => {
                const name = sme.name.toLowerCase();
                const category = sme.category.toLowerCase();

                return name.includes(keyword) || category.includes(keyword);
            });

            renderSmes(filteredSmes);

        });

    })
    .catch(() => {
        smeContainer.innerHTML = "";
        smeEmptyMessage.textContent = "SME data is temporarily unavailable.";
        smeEmptyMessage.style.display = "block";
    });
}

if (productsContainer) {
    fetch("data/products.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load product data");
        }

        return response.json();
    })

    .then(products => {

        products.forEach(product => {

            const productCard = document.createElement("a");

            productCard.classList.add("product-card");
            productCard.href = product.page;
            productCard.setAttribute("aria-label", `View product ${product.name}`);

            productCard.innerHTML = `

                <img src="${product.image}" alt="${product.name}">

                <div class="product-content">

                    <h3>${product.name}</h3>

                    <p class="product-category">${product.category}</p>

                    <p>${product.description}</p>

                    <strong>${product.price}</strong>

                    <span class="product-button">View Product</span>

                </div>
            `;

            productsContainer.appendChild(productCard);

        });

    })
    .catch(() => {
        productsContainer.innerHTML = '<p class="empty-message product-empty">Product data is temporarily unavailable.</p>';
    });
}
