from django.db import models

class MataKuliah(models.Model):
    nama = models.CharField(max_length=100)
    dosen = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Jadwal(models.Model):
    HARI_CHOICES = [
        ('Senin', 'Senin'),
        ('Selasa', 'Selasa'),
        ('Rabu', 'Rabu'),
        ('Kamis', 'Kamis'),
        ('Jumat', 'Jumat'),
        ('Sabtu', 'Sabtu'),
        ('Minggu', 'Minggu'),
    ]

    mata_kuliah = models.ForeignKey(MataKuliah, on_delete=models.CASCADE)
    hari = models.CharField(max_length=10, choices=HARI_CHOICES, default='Senin')  # Dropdown pilihan hari
    jam_mulai = models.TimeField()
    jam_selesai = models.TimeField()
    pj_whatsapp = models.CharField(max_length=15)  # Nomor WA PJ

    def __str__(self):
        return f"{self.mata_kuliah.nama} - {self.hari}"


