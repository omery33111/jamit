import os
import json
from django.core.management.base import BaseCommand
from song.models import Song, Line

class Command(BaseCommand):
    help = 'Load songs and lines from JSON files into the database'

    def handle(self, *args, **kwargs):
        # Define the file names and song names
        # This is a dictionary that maps the JSON file names to the song information
        files = {
            "hey_jude.json": {"song_name": "Hey Jude", "artist": "The Beatles"},
            "veech_shelo.json": {"song_name": "Veech Shelo", "artist": "Ariel Zilber"},
        }

        # Iterate through the files and song information
        for file_name, song_info in files.items():
            # Load the JSON data
            # Construct the full file path by joining the current working directory and the file name
            file_path = os.path.join(os.getcwd(), file_name)
            with open(file_path, 'r', encoding='utf-8') as file:
                # Load the JSON data from the file
                data = json.load(file)

            # Create the song object
            # Use the song information from the dictionary to create a new Song object
            song = Song.objects.create(song_name=song_info["song_name"], artist=song_info["artist"])

            # Load the lines and chords
            # Iterate through the lines of data in the JSON file
            for line_number, line_data in enumerate(data, start=1):
                # Join the lyrics for each word in the line
                lyrics = " ".join([word.get("lyrics", "") for word in line_data])
                # Create a dictionary of chords, where the key is the word index and the value is the chords
                chords = {index + 1: word["chords"] for index, word in enumerate(line_data) if "chords" in word}
                
                # Create the Line object
                # Create a new Line object for the current song, with the line number, lyrics, and chords
                Line.objects.create(song=song, line_number=line_number, lyrics=lyrics, chords=chords)

            # Output a success message
            self.stdout.write(self.style.SUCCESS(f'Successfully loaded {song_info["song_name"]} by {song_info["artist"]}'))