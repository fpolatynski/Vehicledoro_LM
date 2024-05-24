from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    short_break = models.IntegerField(default=300)
    long_break = models.IntegerField(default=900)
    run_time = models.IntegerField(default=1500)

    def serializes(self):
        return {
            "short": self.short_break,
            "long": self.long_break,
            "learn": self.run_time,
        }

    def __str__(self):
        return f"{self.username.upper()}: break: {self.short_break} learn: {self.run_time} long break: {self.long_break}"


class Vehicle(models.Model):
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)
    stage = models.IntegerField(default=0)

    def serialized(self):
        return {
            "name": self.name,
            "image": self.image,
            "stage": self.stage,
        }

    def __str__(self):
        return f"{self.name}: {self.stage}"


class Run(models.Model):
    completed = models.BooleanField()
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="runs")
    time = models.DateTimeField(auto_now_add=True, blank=True)
    user = models.ForeignKey(User, default=User.objects.get(pk=1), on_delete=models.CASCADE, related_name="runs")
