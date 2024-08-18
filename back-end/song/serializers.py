from rest_framework import serializers
from .models import Song, Line



class LineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Line
        fields = ['line_number', 'lyrics', 'chords']

class SongSerializer(serializers.ModelSerializer):
    lines = LineSerializer(many=True)

    class Meta:
        model = Song
        fields = ['id', 'song_name', 'artist', 'lines']
