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
    access_token = models.CharField(max_length=40, blank=False, null=False)

    def __unicode__(self):
        return "{} {}".format(self.first_name, self.last_name)

    class Meta:
        unique_together = ['login']


class Todo(models.Model):
    text = models.TextField(blank=False, null=False)
    date_created = models.DateTimeField(auto_now=True)
    date_finished = models.DateTimeField(null=True)
    amount = models.IntegerField(default=1)
    time = models.ManyToManyField("Time", blank=False, null=False)
    done = models.BooleanField(default=False)

    def __unicode__(self):
        return self.text


class Time(models.Model):
    time = models.DateTimeField(blank=False, null=False)


#include models to the admin
class ViewRoleInAdmin(admin.ModelAdmin):
    list_display = ['name']


class ViewUserInAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'role']


class ViewTodoInAdmin(admin.ModelAdmin):
    list_display = ['text', 'date_created', 'date_finished', 'amount']


try:
    admin.site.register(Role, ViewRoleInAdmin)
    admin.site.register(Users, ViewUserInAdmin)
    admin.site.register(Todo, ViewTodoInAdmin)
    #temp
    admin.site.register(Time)
except Exception:
    pass