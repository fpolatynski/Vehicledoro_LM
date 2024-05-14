import time

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    short_break = models.IntegerField(default=300)
    long_break = models.IntegerField(default=900)
    run_time = models.IntegerField(default=1500)


class Vehicle(models.Model):
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)

    def serialized(self):
        return {
            "name": self.name,
            "image": self.image
        }


class Run(models.Model):
    completed = models.BooleanField()
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="runs")
    start_time = models.DateTimeField()

