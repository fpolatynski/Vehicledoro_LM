import time, json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse

from .models import Run, Vehicle, User


@login_required
def index(request):
    return render(request, "pomodoro/index.html")


def login_view(request):
    if request.method == 'POST':
        name = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=name, password=password)
        if user:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
    return render(request, "pomodoro/login.html")


def register(request):
    if request.method == 'POST':
        name = request.POST.get("username")
        password = request.POST.get("password")
        user = User(username=name, password=password)
        user.save()
        login(request, user)
        return HttpResponseRedirect(reverse('index'))
    else:
        return render(request, "pomodoro/register.html")


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))


@login_required
@csrf_exempt
def add_run(request):
    # Starts run and returns car to acquire
    if request.method == 'POST':
        # get vehicle
        v = Vehicle.objects.get(pk=1)
        # Create run
        r = Run(completed=False, vehicle=v)
        r.save()
        JsonResponse({"vehicle": v.serialize()})




