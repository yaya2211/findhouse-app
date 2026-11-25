let ownerProperties = [
    { id: 101, name: "Melati Residence Kos", location: "Panam, Pekanbaru", type: "Female", price: 850000, rooms: 3 },
    { id: 102, name: "D'Pavilion Exclusive Kos", location: "Gobah, Pekanbaru", type: "Mixed", price: 1650000, rooms: 2 }
];

let bookings = [
    { id: 1, tenant: "Dina Marlina", kosName: "Melati Residence Kos", moveIn: "2026-12-01", duration: "6 Months", status: "Pending" },
    { id: 2, tenant: "Fajar Pratama", kosName: "D'Pavilion Exclusive Kos", moveIn: "2026-12-05", duration: "1 Year", status: "Pending" },
    { id: 3, tenant: "Nadia Putri", kosName: "Melati Residence Kos", moveIn: "2026-11-10", duration: "3 Months", status: "Accepted" }
];

function renderDashboard() {
    document.getElementById("statTotalKos").textContent = ownerProperties.length;
    const totalRooms = ownerProperties.reduce((sum, item) => sum + item.rooms, 0);
    document.getElementById("statAvailableRooms").textContent = totalRooms;
    const pendingCount = bookings.filter((b) => b.status === "Pending").length;
    document.getElementById("statPendingBookings").textContent = pendingCount;

    const propList = document.getElementById("ownerKosList");
    propList.innerHTML = "";
    ownerProperties.forEach((prop) => {
        propList.innerHTML += `
      <div class="list-item-box">
        <div>
          <strong>${prop.name}</strong> <span class="tag-type">${prop.type}</span>
          <p style="font-size:0.85rem; color:#64748b;">📍 ${prop.location} • IDR ${prop.price.toLocaleString("en-US")}/mo</p>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="btn btn-outline" style="padding:4px 10px;" onclick="updateRooms(${prop.id}, -1)">-</button>
          <strong>${prop.rooms} rooms</strong>
          <button class="btn btn-outline" style="padding:4px 10px;" onclick="updateRooms(${prop.id}, 1)">+</button>
        </div>
      </div>
    `;
    });

    const bookList = document.getElementById("bookingList");
    bookList.innerHTML = "";
    bookings.forEach((b) => {
        const statusColor = b.status === "Accepted" ? "#16a34a" : b.status === "Rejected" ? "#dc2626" : "#d97706";
        bookList.innerHTML += `
      <div class="list-item-box">
        <div>
          <strong>${b.tenant}</strong> → <span>${b.kosName}</span>
          <p style="font-size:0.85rem; color:#64748b;">Move-in: ${b.moveIn} • Duration: ${b.duration}</p>
          <span style="font-size:0.8rem; font-weight:700; color:${statusColor};">Status: ${b.status}</span>
        </div>
        ${b.status === "Pending"
                ? `<div style="display:flex; gap:6px;">
                <button class="btn btn-success" onclick="handleBookingStatus(${b.id}, 'Accepted')">Accept</button>
                <button class="btn btn-danger" onclick="handleBookingStatus(${b.id}, 'Rejected')">Reject</button>
              </div>`
                : ""
            }
      </div>
    `;
    });
}

function updateRooms(id, change) {
    const prop = ownerProperties.find((p) => p.id === id);
    if (prop && prop.rooms + change >= 0) {
        prop.rooms += change;
        renderDashboard();
    }
}

function handleBookingStatus(id, newStatus) {
    const booking = bookings.find((b) => b.id === id);
    if (booking) {
        booking.status = newStatus;
        if (newStatus === "Accepted") {
            const prop = ownerProperties.find((p) => p.name === booking.kosName);
            if (prop && prop.rooms > 0) prop.rooms -= 1;
        }
        renderDashboard();
    }
}

document.getElementById("addKosForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newProp = {
        id: Date.now(),
        name: document.getElementById("newKosName").value,
        location: document.getElementById("newKosLoc").value,
        type: document.getElementById("newKosType").value,
        price: Number(document.getElementById("newKosPrice").value),
        rooms: Number(document.getElementById("newKosRooms").value)
    };
    ownerProperties.push(newProp);
    e.target.reset();
    renderDashboard();
});

renderDashboard();