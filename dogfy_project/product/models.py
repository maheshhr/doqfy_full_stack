from django.db import models


# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    price = models.IntegerField(null=True)
    iso_id = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name

