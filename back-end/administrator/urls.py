from django.urls import path
from . import views





urlpatterns = [
    path('admin_search_song/', views.admin_search_song),
]
