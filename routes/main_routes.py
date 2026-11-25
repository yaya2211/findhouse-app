from flask import Blueprint, render_template, abort

main_bp = Blueprint("main", __name__)

# Data Kos terpusat agar bisa diakses oleh router detail
KOS_LIST = [
    {
        "id": 1,
        "name": "Melati Residence Kos",
        "location": "Panam, Pekanbaru",
        "type": "Female",
        "price": 850000,
        "roomsAvailable": 3,
        "rating": 4.8,
        "facilities": ["WiFi", "Private Bathroom", "Bed & Wardrobe", "Motorbike Parking"],
        "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        "description": "Clean, safe, and strategic female-only boarding house near UNRI Panam campus. Quiet and flood-free neighborhood.",
        "reviews": [
            {"user": "Nadia P.", "rating": 5, "comment": "Super clean and very close to campus!"},
            {"user": "Siti A.", "rating": 4.5, "comment": "Fast WiFi and friendly owner."}
        ]
    },
    {
        "id": 2,
        "name": "Griya Putra Mandiri",
        "location": "Marpoyan Damai, Pekanbaru",
        "type": "Male",
        "price": 750000,
        "roomsAvailable": 5,
        "rating": 4.6,
        "facilities": ["WiFi", "Shared Kitchen", "Spacious Parking", "24/7 CCTV"],
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "description": "Male-only boarding house with 24-hour access, wide parking area, and walking distance to Marpoyan culinary spots.",
        "reviews": [
            {"user": "Rizky H.", "rating": 5, "comment": "Spacious parking and affordable monthly price."}
        ]
    },
    {
        "id": 3,
        "name": "D'Pavilion Exclusive Kos",
        "location": "Gobah, Pekanbaru",
        "type": "Mixed",
        "price": 1650000,
        "roomsAvailable": 2,
        "rating": 4.9,
        "facilities": ["AC", "High-Speed WiFi", "Private Bathroom", "Water Heater", "Smart Lock"],
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "description": "Modern, move-in-ready boarding house for students and young workers in the city center.",
        "reviews": [
            {"user": "Kevin T.", "rating": 5, "comment": "Hotel-like rooms, AC works great."}
        ]
    },
    {
        "id": 4,
        "name": "Harmoni Syariah Kos",
        "location": "Sukajadi, Pekanbaru",
        "type": "Female",
        "price": 1100000,
        "roomsAvailable": 4,
        "rating": 4.7,
        "facilities": ["AC", "WiFi", "Private Bathroom", "Laundry Service"],
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "description": "Comfortable female boarding house downtown with easy access to offices and shopping centers.",
        "reviews": [
            {"user": "Ayu L.", "rating": 4.7, "comment": "Safe neighborhood and laundry service is included."}
        ]
    }
]

@main_bp.route("/")
def home():
    return render_template("index.html", kos_list=KOS_LIST)

@main_bp.route("/kos/<int:kos_id>")
def kos_detail(kos_id):
    kos = next((item for item in KOS_LIST if item["id"] == kos_id), None)
    if not kos:
        abort(404)
    return render_template("detail.html", kos=kos)

@main_bp.route("/login")
def login():
    return render_template("auth.html", mode="login")

@main_bp.route("/register")
def register():
    return render_template("auth.html", mode="register")