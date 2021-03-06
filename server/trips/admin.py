from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin  # TODO NB!

from .models import User, Trip


@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    pass


@admin.register(Trip)   # TODO NB! To apply
class TripAdmin(admin.ModelAdmin):
    fields = (
        'id', 'pick_up_address', 'drop_off_address', 'status',
        'driver', 'rider',
        'created', 'updated'
    )
    list_display = (
        'id', 'pick_up_address', 'drop_off_address', 'status',
        'driver', 'rider',
        'created', 'updated'
    )
    list_filter = (
        'status',
    )
    readonly_fields = (
        'id', 'created', 'updated',
    )
