from django.urls import path
from . import consumers



websocket_urlpatterns = [
    path('ws/livepage/', consumers.LivePageConsumer.as_asgi()),
]
