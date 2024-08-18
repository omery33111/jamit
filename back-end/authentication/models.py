from django.contrib.auth.models import AbstractUser
from django.db import models





class UserProfile(AbstractUser):
    instrument = models.CharField(max_length=30, blank=True, null=True)
    is_admin = models.BooleanField(default=False)
