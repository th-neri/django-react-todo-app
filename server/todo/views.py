from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from .models import Todo
from .serializers import TodoSerializer
from .pagination import DefaultPagination

class TodoView(ModelViewSet):
    queryset = Todo.objects.all().order_by('id')
    serializer_class = TodoSerializer
    pagination_class = DefaultPagination
    filter_backends = [SearchFilter]
    search_fields = ['title']



