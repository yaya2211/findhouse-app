from flask import Blueprint, render_template

owner_bp = Blueprint("owner", __name__)

@owner_bp.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")