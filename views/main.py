from flask import redirect
from . import main_bp

@main_bp.route("/")
def index():
    return redirect("/skills")