from django.db import models
from django.utils import timezone

class Todo(models.Model):
    STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('incompleted', 'Incompleted')
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS, default='pending')
    due_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # using < so it stay as pending through the day and only turns incompleted the next day
        if self.status == 'pending' and self.due_date and self.due_date < timezone.localdate():
            self.status = 'incompleted'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

        
    
