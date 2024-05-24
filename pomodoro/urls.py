from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("get_vehicle", views.get_vehicle, name="vehicle"),
    path("get_settings", views.get_settings, name="get_settings"),
    path("settings", views.settings, name="settings"),
    path("save_car", views.save_car, name="save_car"),
]
