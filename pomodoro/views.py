import time, json

from django.shortcuts import render
from django.http import JsonResponse

from models import Session, Run, Vehicle


def index(request):
    return render(request, "pomodoro/index.html")


def add_run(request):
    # Starts run and returns car to acquire
    if request.method == 'POST':
        # Get last opened session
        s = Session.objects.all().order_by('start_time')[-1]
        if s.ended:
            # Create new session
            s = Session(start_time=time.time(), ended=False)
        # get vehicle
        v = Vehicle.objects.get(pk=1)
        # Create run
        r = Run(completed=False, vehicle=v)
        r.save()
        JsonResponse({"vehicle": v.serialize()})




