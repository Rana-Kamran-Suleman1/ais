from django.db import models


class Sale(models.Model):
    quantity = models.IntegerField(default=1)
    per_price = models.IntegerField(default=1)
    total_price = models.IntegerField(default=1)

    
