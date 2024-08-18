from django.forms import ValidationError
from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed

from .models import UserProfile





# ------------- REGISTRATION:
@api_view(["POST"])
def register(request):
    try:
        # Extract user data from request
        username = request.data["username"]
        password = request.data["password"]
        instrument = request.data["instrument"]

        # Validate required fields
        if not all([username, password, instrument]):
            return Response({"error": "Please fill in all fields"},
                   status=status.HTTP_400_BAD_REQUEST)

        # Check for existing username (case-insensitive)
        if UserProfile.objects.filter(Q(username__iexact=username)).exists():
            return Response({"error": "Username already exists"},
                   status=status.HTTP_400_BAD_REQUEST)
        
        # Create user with "create_user()" function, additional checks handled by Django
        user = UserProfile.objects.create_user(username=username, password=password, instrument=instrument, is_active=True)
        # Save user after passing all validations
        return Response({"success": "Registered successfully!"},
               status=status.HTTP_201_CREATED)

    # Handle other validation errors, specific error messages will be provided by Django
    except ValidationError as e:
        return Response({"error": f"Registration failed: {e.message}"},
               status=status.HTTP_400_BAD_REQUEST)
    
    # Catch any unexpected errors
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"},
               status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# ------------- ADMIN REGISTRATION:
@api_view(["POST"])
def admin_register(request):
    try:
        # Extract user data from request
        username = request.data["username"]
        password = request.data["password"]
        instrument = request.data["instrument"]

        # Validate required fields
        if not all([username, password, instrument]):
            return Response({"error": "Please fill in all fields"},
                   status=status.HTTP_400_BAD_REQUEST)

        # Check for existing username (case-insensitive)
        if UserProfile.objects.filter(Q(username__iexact=username)).exists():
            return Response({"error": "Username already exists"},
                   status=status.HTTP_400_BAD_REQUEST)
        
        # Create user with "create_user()" function, additional checks handled by Django, also is_admin = True to catch admins registration
        user = UserProfile.objects.create_user(username=username, password=password, instrument=instrument, is_active=True, is_admin=True, is_staff=True)
        # Save user after passing all validations
        return Response({"success": "Registered successfully!"},
               status=status.HTTP_201_CREATED)

    # Handle other validation errors, specific error messages will be provided by Django
    except ValidationError as e:
        return Response({"error": f"Registration failed: {e.message}"},
               status=status.HTTP_400_BAD_REQUEST)
    
    # Catch any unexpected errors
    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {e}"},
               status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# ------------- LOGIN:
# Using serializer to get JWT tokens
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Raise an error if user is not found
        if not user:
            raise AuthenticationFailed('User not found.')
        
        # get_token method to generate the token
        token = super().get_token(user)
        
        # Include "username" in the token
        token["username"] = user.username
        # Include "is_admin" in the token
        token['is_admin'] = user.is_admin

        # Return the generated tokens
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
