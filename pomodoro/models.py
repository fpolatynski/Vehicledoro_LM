from django.db import models


class Vehicle(models.Model):
    name = models.CharField(max_length=64)
    image = models.CharField(max_length=128)

    def serialized(self):
        return {
            "name": self.name,
            "image": self.image
        }


class Session(models.Model):
    start_time = models.DateTimeField()
    ended = models.BooleanField()
    end_time = models.DateTimeField()
    run_number = models.IntegerField(default=8)
    short_break = models.IntegerField(default=300)
    long_break = models.IntegerField(default=900)
    run_time = models.IntegerField(default=1500)


class Run(models.Model):
    completed = models.BooleanField()
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name="runs")
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name="runs")
