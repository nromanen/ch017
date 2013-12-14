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
    datetime_created = models.DateTimeField(auto_now=True)
    datetime_finished = models.DateTimeField(null=True)
    amount = models.IntegerField(default=1)
    time = models.ManyToManyField("Time", blank=False, null=False)
    done = models.BooleanField(default=False)

    def __unicode__(self):
        return self.text

    def get_date_created(self):
        return str(self.datetime_created).replace('T', ' ')

    def get_date_finished(self):
        return str(self.datetime_finished).replace('T', ' ')

    date_created = property(get_date_created, )
    date_finished = property(get_date_finished, )


class Time(models.Model):
    datetime = models.DateTimeField(blank=False, null=False)

    def __unicode__(self):
        return "{}".format(self.datetime)

    def get_time(self):
        return str(self.datetime).split(' ')[::-1][0]

    def get_date(self):
        return str(self.datetime).split(' ')[0]

    date =  property(get_date, )
    time = property(get_time, )


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