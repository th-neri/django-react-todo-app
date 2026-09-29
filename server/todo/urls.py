from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('tasks', views.TodoView, basename='tasks')
router.urls

urlpatterns = router.urls