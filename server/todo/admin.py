from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'status', 'due_date', 'username']
    ordering = ['title']

    def username(self, todo):
        return todo.user.username