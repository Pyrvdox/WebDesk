from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserForm(UserCreationForm):
        class Meta(UserCreationForm.Meta):
            model = CustomUser
            fields = ("email",)

class CustomUserUpdateForm(UserChangeForm):
        class Meta:
            model = CustomUser
            fields = ("email",)