from django.contrib import admin
from .models import CustomUser, Notes
from .forms import CustomUserForm, CustomUserUpdateForm, NotesForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):

    model = CustomUser
    add_form = CustomUserForm
    form = CustomUserUpdateForm


class NotesAdmin(admin.ModelAdmin):
    date_hierarchy = 'date'

    model= Notes
    form = NotesForm

admin.site.register(Notes, NotesAdmin)