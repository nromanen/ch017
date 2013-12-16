#-*-coding:UTF-8-*-
from piston.handler import BaseHandler
from models import Users, Todo, Role, Time, Medicines
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import Http404
from piston.utils import rc
import base64
import datetime
import urllib
from django.utils.simplejson import dumps, loads


class UserHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = Users
    fields = (
        'id',
        'first_name',
        'last_name',
        'foto',
        'login',
        ('role', (
            'name',
            'add',
            'edit',
            'remove',
            'check'
        )),
        'access_token',
        ('todo',
            (
                'text',
                'date_created',
                'date_finished',
                'amount',
                'done',
                ('time',
                    ('id',
                     'date',
                     'time'
                    )
                )
            )
        )
    )

    def get_user(self, login, password):
        password = base64.b64decode(password)
        return Users.objects.get(login=login, password=password)

    def read(self, request, role=None, login=None, password=None):
        if role:
            try:
                return Users.objects.filter(role__name=role)
            except AttributeError:
                return rc.BAD_REQUEST
        elif login and password:
            return self.get_user(login, password)
        else:
            return Users.objects.all()


class TodoHandler(BaseHandler):
    allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
    model = Todo
    fields = (
        'id',
        'text',
        'date_created',
        'date_finished',
        'amount',
        'done',
        ('time',
            ('id',
             'date',
             'time'
            )
        )
    )

    def read(self, request, login=None, password=None):
        method = request.GET.get("method")
        identify = request.GET.get("id")
        data = request.GET.get("data")

        if login and password:
            password = base64.b64decode(password)
            user = Users.objects.get(login=login, password=password)
            return user.todo.all() if user else rc.BAD_REQUEST
        elif method == "PUT":
            return self.update(request, data)
        elif method == "POST":
            return self.create(request, identify, data)
        elif method == "DELETE":
            return self.delete(request, identify)
        else:
            return Todo.objects.all()

    def create(self, request, user_id, data):
        todo = loads(urllib.unquote(data))
        new_todo = Todo.objects.create(text=todo["text"], done=todo["done"])
        new_todo.users_set.add(Users.objects.get(pk=user_id))
        new_todo.save()
        for date in todo["time"]:
            time = Time.objects.create(
                datetime=datetime.datetime.strptime(' '.join([date["date"], date["time"]]), '%Y-%m-%d %H:%M:%S')
            )
            time.todo_set.add(new_todo)
            time.save()

        return {"success": True}


    def update(self, request, data):
        todo = loads(urllib.unquote(data))
        todo_item = get_object_or_404(Todo, pk=todo["id"])
        todo_item.text = todo["text"]
        todo_item.done = todo["done"]
        todo_item.save()
        Time.objects.filter(todo__id=todo["id"]).delete()
        for date in todo["time"]:
            time = Time.objects.create(
                datetime=datetime.datetime.strptime(' '.join([date["date"], date["time"]]), '%Y-%m-%d %H:%M:%S')
            )
            time.todo_set.add(todo_item)
            time.save()

        return {"success": True}

    def delete(self, request, time_id):
        todo_time = get_object_or_404(Time, pk=time_id)

        todo_time.delete()

        return {"success": True}


class MedicineHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = Medicines

    def read(self, request):
        return Medicines.objects.all()
