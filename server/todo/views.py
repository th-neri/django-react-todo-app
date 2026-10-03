from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
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

        # turn over due pending tasks to incompleted
        Todo.objects.filter(status='pending', due_date__lt=today).update(status='incompleted')

        return Todo.objects.all().order_by('id')


