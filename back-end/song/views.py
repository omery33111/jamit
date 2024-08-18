from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions

from song.serializers import SongSerializer
from song.models import Song



@api_view(["GET"])
def single_song(request, pk = -1):
    try:
        song = Song.objects.get(id=pk)
        user = request.user

        # Serialize the song data
        serializer = SongSerializer(song)
        data = serializer.data

        # Check the user's instrument and remove chords if needed
        if user.instrument == "vocals":
            for line in data.get('lines', []):
                line.pop('chords', None)

        return Response(data)
    except Song.DoesNotExist:
        return Response({"error": "Song not found"}, status=404)