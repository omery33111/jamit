from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions

from song.models import Song
from song.serializers import SongSerializer

from django.db.models import Q


@api_view(["GET"])
@permission_classes([permissions.IsAdminUser])
def admin_search_song(request):
    song_name = request.GET.get("name", "")

    songs = Song.objects.filter(Q(song_name__icontains=song_name))

    serializer = SongSerializer(songs, many=True)

    return Response(serializer.data)
