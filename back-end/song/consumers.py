import json
from channels.generic.websocket import WebsocketConsumer

class LivePageConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')

        if message == 'START_LIVE_SHOW':
            self.send(text_data=json.dumps({
                'message': 'START_LIVE_SHOW'
            }))
