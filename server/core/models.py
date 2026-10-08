from django.db import models
from django.contrib.auth.models import AbstractUser

# to extend the User model i create a new model that extends AbstractUser
class User(AbstractUser):
    email = models.EmailField(unique=True)
