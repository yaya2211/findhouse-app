from flask import Flask
from routes.main_routes import main_bp
from routes.owner_routes import owner_bp

app = Flask(__name__)

# Register Routers (Blueprints)
app.register_blueprint(main_bp)
app.register_blueprint(owner_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)