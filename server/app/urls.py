from django.contrib import admin
from django.urls import path, include
from todo import views

admin.site.site_header = 'Storefront Admin'
admin.site.index_title = 'Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('todo/', include('todo.urls')),
]
