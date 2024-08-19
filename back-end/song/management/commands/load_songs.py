import json
from django.core.management.base import BaseCommand
from song.models import Song, Line

class Command(BaseCommand):
    help = 'Load lyrics and chords from JSON file into the database'

    def handle(self, *args, **kwargs):
        # Load the JSON data
        with open('dump_db.json', 'r', encoding="utf-8") as file:
            data = json.load(file)

        # Create a new song entry (modify as needed)
        song = Song.objects.create(song_name="Veech Shelo", artist="Ariel Zilber")

        # Process each line in the JSON
        for line_number, line_data in enumerate(data, start=1):
            lyrics = ' '.join([item['lyrics'] for item in line_data])
            chords = {item['chords']: index + 1 for index, item in enumerate(line_data) if 'chords' in item}

            # Save the line and associated chords
            Line.objects.create(song=song, line_number=line_number, lyrics=lyrics, chords=chords)
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded lyrics and chords into the database'))
