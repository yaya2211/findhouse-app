let favorites = [];
let showFavoritesOnly = false;

function applyFilters() {
    const keyword = document.getElementById("searchKeyword").value.toLowerCase();
    const type = document.getElementById("filterType").value;
    const maxPrice = parseInt(document.getElementById("filterPrice").value, 10);
    const cards = document.querySelectorAll(".kos-card");

    let visibleCount = 0;

    cards.forEach((card) => {
        const id = parseInt(card.dataset.id, 10);
        const name = card.dataset.name;
        const location = card.dataset.location;
        const kosType = card.dataset.type;
        const price = parseInt(card.dataset.price, 10);

        const matchKeyword = name.includes(keyword) || location.includes(keyword);
        const matchType = type === "all" || kosType === type;
        const matchPrice = price <= maxPrice;
        const matchFav = !showFavoritesOnly || favorites.includes(id);

        if (matchKeyword && matchType && matchPrice && matchFav) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("resultCount").textContent =
        `Showing ${visibleCount} available ${visibleCount === 1 ? "property" : "properties"}`;
}

document.getElementById("filterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
});

function toggleFavorite(id, btnElement) {
    if (favorites.includes(id)) {
        favorites = favorites.filter((favId) => favId !== id);
        btnElement.textContent = "🤍";
    } else {
        favorites.push(id);
        btnElement.textContent = "❤️";
    }
    document.getElementById("favCount").textContent = favorites.length;
    applyFilters();
}

function toggleFavoritesOnly() {
    showFavoritesOnly = !showFavoritesOnly;
    const btn = document.getElementById("toggleFavBtn");
    btn.style.background = showFavoritesOnly ? "#eff6ff" : "transparent";
    applyFilters();
}