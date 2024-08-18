import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'live_show'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps({
            'type': 'connection',
            'message': 'ok'
        }))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        self.send(text_data=json.dumps({
            'type': 'disconnection',
            'message': 'goodbye'
        }))

    def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            room = text_data_json['room']
            if 'room' in text_data_json:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'start_show',
                        'room': room
                    }
                )
            else:
                self.send(text_data=json.dumps({
                    'type': 'error',
                    'message': 'Invalid room'
                }))
        except json.JSONDecodeError:
            self.send(text_data=json.dumps({
                'type': 'error',
                'message': 'Invalid JSON'
            }))
        except KeyError as e:
            self.send(text_data=json.dumps({
                'type': 'error',
                'message': f'Missing key: {str(e)}'
            }))

    def start_show(self, event):
        room = event['room']

        self.send(text_data=json.dumps({
            'type': 'show',
            'room': room
        }))