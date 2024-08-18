from django.urls import path
from . import views





urlpatterns = [
    path('single_song/<int:pk>/', views.single_song),
]
