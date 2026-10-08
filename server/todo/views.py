from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from .models import Todo
from .serializers import TodoSerializer
from .pagination import DefaultPagination

class TodoView(ModelViewSet):
    serializer_class = TodoSerializer
    pagination_class = DefaultPagination
    filter_backends = [SearchFilter]
    search_fields = ['title']

    def get_queryset(self):
        today = timezone.localdate()

        user_todos = Todo.objects.filter(user=self.request.user)

        # turn over due pending tasks to incompleted
        user_todos.filter(status='pending', due_date__lt=today).update(status='incompleted')

        return user_todos.order_by('id')

    # automatically assign the logged-in user when creating a new todo
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    



