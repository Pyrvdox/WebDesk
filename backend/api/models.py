from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]
    
    def __str__(self):
        return self.email
    

class Notes(models.Model):
    title = models.CharField(max_length=128)
    text = models.CharField()
    author = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)