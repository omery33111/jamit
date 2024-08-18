# import json
# from django.core.management.base import BaseCommand
# from song.models import Song, Line

# class Command(BaseCommand):
#     help = 'Load song data from JSON'

#     def handle(self, *args, **kwargs):
#         with open('dump_db.json', 'r') as file:
#             data = json.load(file)

#         song = Song.objects.create(song_name="Hey Jude", artist="The Beatles")

#         for line_number, line_data in enumerate(data, start=1):
#             chords = []
#             lyrics = []
            
#             for item in line_data:
#                 lyrics.append(item['lyrics'])
#                 if 'chords' in item:
#                     chords.append(item['chords'])

#             chords_line = ' '.join(chords)
#             lyrics_line = ' '.join(lyrics)

#             Line.objects.create(
#                 song=song,
#                 line_number=line_number,
#                 chords_line=chords_line,
#                 lyrics_line=lyrics_line
#             )

#         self.stdout.write(self.style.SUCCESS('Data loaded successfully'))



import json
from django.core.management.base import BaseCommand
from song.models import Song, Line

class Command(BaseCommand):
    help = 'Load lyrics and chords from JSON file into the database'

    def handle(self, *args, **kwargs):
        # Load the JSON data
        with open('dump_db.json', 'r') as file:
            data = json.load(file)

        # Create a new song entry (modify as needed)
        song = Song.objects.create(song_name="Hey Jude", artist="The Beatles")

        # Process each line in the JSON
        for line_number, line_data in enumerate(data, start=1):
            lyrics = ' '.join([item['lyrics'] for item in line_data])
            chords = {item['chords']: index + 1 for index, item in enumerate(line_data) if 'chords' in item}

            # Save the line and associated chords
            Line.objects.create(song=song, line_number=line_number, lyrics=lyrics, chords=chords)
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded lyrics and chords into the database'))
