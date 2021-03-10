from django.db import models


class Purchase(models.Model):
    quantity = models.IntegerField(default=1)
    per_price = models.IntegerField(default=1)
    total_price = models.IntegerField(default=1)

    def __str__(self):
        return self.per_price
