const smeContainer = document.getElementById("smeContainer");
const smeSearchInput = document.getElementById("smeSearchInput");
const smeEmptyMessage = document.getElementById("smeEmptyMessage");

function renderSmes(smes) {
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

fetch("data/sme.json")
    .then(response => response.json())

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

    });

    const productsContainer = document.getElementById("productsContainer");

fetch("data/products.json")
    .then(response => response.json())

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

    });
