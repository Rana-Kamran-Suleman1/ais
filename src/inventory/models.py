from django.db import models
from django.db.models.base import Model

# Create your models here.


class Inventory(models.Model):
    name = models.CharField(max_length=30, unique=True)
    quantity = models.IntegerField(default=1)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.name
