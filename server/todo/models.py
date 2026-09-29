from django.db import models

class Todo(models.Model):
    STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('incompleted', 'Incompleted')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')

    def __str__(self):
        return self.title
    
