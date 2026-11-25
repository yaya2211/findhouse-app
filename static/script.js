const kosData = [
    {
        id: 1,
        name: "Melati Residence Kos",
        location: "Panam, Pekanbaru",
        type: "Female",
        price: 850000,
        roomsAvailable: 3,
        rating: 4.8,
        facilities: ["WiFi", "Private Bathroom", "Bed & Wardrobe", "Motorbike Parking"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        description: "Clean, safe, and strategic female-only boarding house near UNRI Panam campus. Quiet and flood-free neighborhood.",
        reviews: [
            { user: "Nadia P.", rating: 5, comment: "Super clean and very close to campus!" },
            { user: "Siti A.", rating: 4.5, comment: "Fast WiFi and friendly owner." }
        ]
    },
    {
        id: 2,
        name: "Griya Putra Mandiri",
        location: "Marpoyan Damai, Pekanbaru",
        type: "Male",
        price: 750000,
        roomsAvailable: 5,
        rating: 4.6,
        facilities: ["WiFi", "Shared Kitchen", "Spacious Parking", "24/7 CCTV"],
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        description: "Male-only boarding house with 24-hour access, wide parking area, and walking distance to Marpoyan culinary spots.",
        reviews: [
            { user: "Rizky H.", rating: 5, comment: "Spacious parking and affordable monthly price." }
        ]
    },
    {
        id: 3,
        name: "D'Pavilion Exclusive Kos",
        location: "Gobah, Pekanbaru",
        type: "Mixed",
        price: 1650000,
        roomsAvailable: 2,
        rating: 4.9,
        facilities: ["AC", "High-Speed WiFi", "Private Bathroom", "Water Heater", "Smart Lock"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        description: "Modern, move-in-ready boarding house for students and young workers in the city center.",
        reviews: [
            { user: "Kevin T.", rating: 5, comment: "Hotel-like rooms, AC works great." }
        ]
    },
    {
        id: 4,
        name: "Harmoni Syariah Kos",
        location: "Sukajadi, Pekanbaru",
        type: "Female",
        price: 1100000,
        roomsAvailable: 4,
        rating: 4.7,
        facilities: ["AC", "WiFi", "Private Bathroom", "Laundry Service"],
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable female boarding house downtown with easy access to offices and shopping centers.",
        reviews: [
            { user: "Ayu L.", rating: 4.7, comment: "Safe neighborhood and laundry service is included." }
        ]
    }
];

let favorites = [];
let showFavoritesOnly = false;

const kosGrid = document.getElementById("kosGrid");
const resultCount = document.getElementById("resultCount");
const favCount = document.getElementById("favCount");

function formatCurrency(amount) {
    return "IDR " + amount.toLocaleString("en-US");
}

function renderKosList(list) {
    kosGrid.innerHTML = "";
    resultCount.textContent = `Showing ${list.length} available ${list.length === 1 ? "property" : "properties"}`;

    if (list.length === 0) {
        kosGrid.innerHTML = `<p>No boarding houses match your search criteria.</p>`;
        return;
    }

    list.forEach((kos) => {
        const isFav = favorites.includes(kos.id);
        const card = document.createElement("div");
        card.className = "kos-card";
        card.innerHTML = `
      <img src="${kos.image}" alt="${kos.name}" class="kos-img" />
      <div class="kos-body">
        <div class="kos-tags">
          <span class="tag-type">${kos.type} Kos</span>
          <button class="fav-btn" onclick="toggleFavorite(${kos.id})" title="Save to Favorites">
            ${isFav ? "❤️" : "🤍"}
          </button>
        </div>
        <h3 class="kos-title">${kos.name}</h3>
        <p class="kos-loc">📍 ${kos.location} • ⭐ ${kos.rating} (${kos.reviews.length} reviews)</p>
        <p class="kos-facilities">${kos.facilities.slice(0, 3).join(" • ")}</p>
        <div class="kos-footer">
          <div class="kos-price">${formatCurrency(kos.price)}<span>/mo</span></div>
          <button class="btn btn-primary" onclick="openDetailModal(${kos.id})">Details & Book</button>
        </div>
      </div>
    `;
        kosGrid.appendChild(card);
    });
}

function applyFilters() {
    const keyword = document.getElementById("searchKeyword").value.toLowerCase();
    const type = document.getElementById("filterType").value;
    const maxPrice = parseInt(document.getElementById("filterPrice").value, 10);

    const filtered = kosData.filter((kos) => {
        const matchKeyword =
            kos.name.toLowerCase().includes(keyword) ||
            kos.location.toLowerCase().includes(keyword);
        const matchType = type === "all" || kos.type === type;
        const matchPrice = kos.price <= maxPrice;
        const matchFav = !showFavoritesOnly || favorites.includes(kos.id);
        return matchKeyword && matchType && matchPrice && matchFav;
    });

    renderKosList(filtered);
}

document.getElementById("filterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
});

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter((favId) => favId !== id);
    } else {
        favorites.push(id);
    }
    favCount.textContent = favorites.length;
    applyFilters();
}

function toggleFavoritesOnly() {
    showFavoritesOnly = !showFavoritesOnly;
    const btn = document.getElementById("toggleFavBtn");
    btn.style.background = showFavoritesOnly ? "#eff6ff" : "transparent";
    applyFilters();
}

function openDetailModal(id) {
    const kos = kosData.find((item) => item.id === id);
    if (!kos) return;

    const reviewsHtml = kos.reviews
        .map(
            (r) => `<div style="background:#f8fafc; padding:10px; border-radius:8px; margin-bottom:8px; font-size:0.85rem;">
                <strong>${r.user}</strong> (⭐ ${r.rating})<br/>${r.comment}
              </div>`
        )
        .join("");

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
    <img src="${kos.image}" alt="${kos.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px; margin-bottom:16px;" />
    <span class="tag-type">${kos.type} Kos • ${kos.roomsAvailable} Rooms Left</span>
    <h2 style="margin: 8px 0 4px;">${kos.name}</h2>
    <p style="color:#64748b; font-size:0.9rem; margin-bottom:12px;">📍 ${kos.location} | ⭐ ${kos.rating} (${kos.reviews.length} reviews)</p>
    <p style="margin-bottom:14px;">${kos.description}</p>
    <p style="font-weight:700; margin-bottom:6px;">Facilities:</p>
    <p style="margin-bottom:16px; font-size:0.9rem;">✅ ${kos.facilities.join("  •  ✅ ")}</p>

    <hr style="border:0; border-top:1px solid #e2e8f0; margin:16px 0;" />
    <h4 style="margin-bottom:10px;">Request Room Booking (${formatCurrency(kos.price)}/month)</h4>
    <form onsubmit="submitBooking(event, '${kos.name}')">
      <div class="form-group">
        <label>Tenant Full Name</label>
        <input type="text" required placeholder="Enter your full name" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Move-In Date</label>
          <input type="date" required />
        </div>
        <div class="form-group">
          <label>Lease Duration</label>
          <select>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Submit Booking Request</button>
    </form>

    <hr style="border:0; border-top:1px solid #e2e8f0; margin:18px 0;" />
    <h4 style="margin-bottom:10px;">Tenant Reviews</h4>
    ${reviewsHtml}
    <form onsubmit="addReview(event, ${kos.id})" style="margin-top:12px;">
      <div class="form-row">
        <input type="text" id="revName" required placeholder="Your Name" />
        <select id="revRating">
          <option value="5">⭐ 5 - Excellent</option>
          <option value="4">⭐ 4 - Good</option>
          <option value="3">⭐ 3 - Average</option>
        </select>
      </div>
      <textarea id="revComment" rows="2" required placeholder="Write your review..." style="margin-top:8px;"></textarea>
      <button type="submit" class="btn btn-outline btn-block" style="margin-top:8px;">Post Review</button>
    </form>
  `;

    document.getElementById("detailModal").classList.add("active");
}

function addReview(e, kosId) {
    e.preventDefault();
    const kos = kosData.find((item) => item.id === kosId);
    const user = document.getElementById("revName").value;
    const rating = Number(document.getElementById("revRating").value);
    const comment = document.getElementById("revComment").value;

    kos.reviews.push({ user, rating, comment });
    openDetailModal(kosId);
    applyFilters();
}

function submitBooking(e, kosName) {
    e.preventDefault();
    alert(`Booking request for "${kosName}" has been submitted! The owner will review and confirm your request shortly.`);
    closeModal("detailModal");
}

function openAuthModal(mode, defaultRole = "tenant") {
    const modal = document.getElementById("authModal");
    const title = document.getElementById("authTitle");
    const nameField = document.getElementById("nameField");
    const submitBtn = document.getElementById("authSubmitBtn");
    const roleSelect = document.getElementById("authRole");

    roleSelect.value = defaultRole;

    if (mode === "register") {
        title.textContent = "Create a FindHouse Account";
        nameField.style.display = "block";
        submitBtn.textContent = "Sign Up";
    } else {
        title.textContent = "Log In to FindHouse";
        nameField.style.display = "none";
        submitBtn.textContent = "Log In";
    }

    modal.classList.add("active");
}

document.getElementById("authForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("authRole").value;
    if (role === "owner") {
        window.location.href = "/dashboard";
    } else {
        const email = document.getElementById("authEmail").value;
        alert(`Successfully signed in as Tenant (${email})!`);
        closeModal("authModal");
    }
});

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

renderKosList(kosData);