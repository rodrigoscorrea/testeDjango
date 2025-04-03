from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserInfoView

urlpatterns = [
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/user', LoginView.as_view()),
    path('user', UserInfoView.as_view()),
    path('auth/logout', LogoutView.as_view())
]