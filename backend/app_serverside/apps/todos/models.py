from django.db import models
from django.contrib import admin


class Role(models.Model):
    name = models.CharField(max_length=255, blank=False)
    add = models.BooleanField(default=False)
    edit = models.BooleanField(default=False)
    remove = models.BooleanField(default=False)
    check = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name


class Users(models.Model):
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    foto = models.ImageField(upload_to='fotos/')
    login = models.CharField(max_length=255, blank=False, null=False)
    password = models.CharField(max_length=255, blank=False, null=False)
    role = models.ForeignKey(Role, blank=False, null=False)
    todo = models.ManyToManyField("Todo", blank=True, null=True)
    is_doctor = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    def __unicode__(self):
        return "{} {}".format(self.first_name, self.last_name)

    class Meta:
        unique_together = ['login']
        verbose_name_plural = "Users"


class Todo(models.Model):
    text = models.TextField(blank=False, null=False)
    datetime_created = models.DateTimeField(auto_now=True)
    datetime_finished = models.DateTimeField(null=True)
    time = models.ManyToManyField("Time", blank=False, null=False)

    def __unicode__(self):
        return self.text

    def get_date_created(self):
        return str(self.datetime_created).replace('T', ' ')

    def get_date_finished(self):
        return str(self.datetime_finished).replace('T', ' ')

    date_created = property(get_date_created, )
    date_finished = property(get_date_finished, )


class Medicines(models.Model):
    title = models.CharField(blank=False, null=False, max_length=255)

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Medicines"


class Time(models.Model):
    datetime = models.DateTimeField(blank=False, null=False)
    done = models.BooleanField(default=False)

    def __unicode__(self):
        return "{}".format(self.datetime)

    def get_time(self):
        datetime = str(self.datetime).split(' ')[::-1][0]
        return datetime[:datetime.rfind(':')]

    def get_date(self):
        return str(self.datetime).split(' ')[0]

    date =  property(get_date, )
    time = property(get_time, )


#include models to the admin
class ViewRoleInAdmin(admin.ModelAdmin):
    list_display = ['name']


class ViewUserInAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'role', 'is_active', 'is_staff', 'is_doctor']


class ViewTodoInAdmin(admin.ModelAdmin):
    list_display = ['text', 'date_created', 'date_finished']


class ViewMedicinesInAdmin(admin.ModelAdmin):
    list_display = ['title']


try:
    admin.site.register(Role, ViewRoleInAdmin)
    admin.site.register(Users, ViewUserInAdmin)
    admin.site.register(Todo, ViewTodoInAdmin)
    admin.site.register(Medicines, ViewMedicinesInAdmin)
    #temp
    admin.site.register(Time)
except Exception:
    pass