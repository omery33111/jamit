from django.db import models



class Song(models.Model):
    song_name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title} by {self.artist}"

class Line(models.Model):
    song = models.ForeignKey(Song, related_name='lines', on_delete=models.CASCADE)
    line_number = models.PositiveIntegerField()
    lyrics = models.TextField()
    chords = models.JSONField()

    def __str__(self):
        return f"Line {self.line_number} of {self.song.title}"
