from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser, Notes
from django import forms

class CustomUserForm(UserCreationForm):
        class Meta(UserCreationForm.Meta):
            model = CustomUser
            fields = ("email",)

class CustomUserUpdateForm(UserChangeForm):
        class Meta:
            model = CustomUser
            fields = ("email",)


class NotesForm(forms.ModelForm):
    class Meta:
        model = Notes
        fields = ['title', 'text', 'author']