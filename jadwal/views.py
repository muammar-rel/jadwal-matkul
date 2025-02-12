from django.shortcuts import render
from datetime import datetime, timedelta
from .models import Jadwal

def get_day_name(day_offset=0):
    hari_dict = {
        "Monday": "Senin",
        "Tuesday": "Selasa",
        "Wednesday": "Rabu",
        "Thursday": "Kamis",
        "Friday": "Jumat",
        "Saturday": "Sabtu",
        "Sunday": "Minggu",
    }
    target_day = datetime.today() + timedelta(days=day_offset)
    return hari_dict[target_day.strftime("%A")]

def index(request):
    hari_ini = get_day_name()
    besok = get_day_name(1)

    jadwal_hari_ini = Jadwal.objects.filter(hari=hari_ini)
    jadwal_besok = Jadwal.objects.filter(hari=besok)

    return render(request, "jadwal/index.html", {
        "jadwal_hari_ini": jadwal_hari_ini,
        "jadwal_besok": jadwal_besok,
    })
