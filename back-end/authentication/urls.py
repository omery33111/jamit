from django.urls import path
from . import views





urlpatterns = [
    path('register/', views.register),
    path('login/', views.MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('admin_register/', views.admin_register),
]