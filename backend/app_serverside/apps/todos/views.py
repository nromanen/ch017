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
        ('todo',
            (
                'text',
                'date_created',
                'date_finished',
                ('time',
                    ('id',
                     'date',
                     'time'
                    )
                )
            )
        )
    )

    def read(self, request, role=None, login=None, password=None):
        if role:
            return Users.objects.filter(role__name=role)
        elif login and password:
            password = base64.b64decode(password)
            return Users.objects.get(login=login, password=password)
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
        ('time',
            ('id',
             'date',
             'time',
             'done'
            )
        )
    )

    def read(self, request, login=None, password=None, user_id=None, todo_id=None):
        if user_id:
            user = Users.objects.get(pk=user_id)
            return user.todo.all()
        elif login and password:
            password = base64.b64decode(password)
            user = Users.objects.get(login=login, password=password)
            return user.todo.all()
        elif todo_id:
            return Todo.objects.get(pk=todo_id)
        else:
            return Todo.objects.all()

    def create(self, request, user_id):
        if request.content_type:
            user = Users.objects.get(pk=user_id)
            patient_id = request.data["patient_id"]
            todo = loads(request.data["data"])
            new_todo = Todo.objects.create(text=todo["text"])
            new_todo.users_set.add(Users.objects.get(pk=patient_id))
            new_todo.save()
            for date in todo["time"]:
                time = Time.objects.create(
                    datetime=datetime.datetime.strptime(' '.join([date["date"], date["time"]]), '%Y-%m-%d %H:%M:%S')
                )
                time.todo_set.add(new_todo)
                time.save()

            return {"todo_id": new_todo.id}
        return rc.BAD_REQUEST

    def update(self, request, todo_id, user_id):
        if request.content_type:
            user = Users.objects.get(pk=user_id)
            todo = loads(urllib.unquote(request.data["data"]))
            todo = loads(todo)
            todo_item = get_object_or_404(Todo, pk=todo_id)
            todo_item.text = todo["text"]
            todo_item.save()
            Time.objects.filter(todo__id=todo_id).delete()
            for date in todo["time"]:
                time = Time.objects.create(
                    datetime=datetime.datetime.strptime(' '.join([date["date"], date["time"]]), '%Y-%m-%d %H:%M:%S'),
                    done=date["done"]
                )
                time.todo_set.add(todo_item)
                time.save()
            return rc.ALL_OK
        return rc.BAD_REQUEST

    def delete(self, request, todo_id, user_id):
        user = Users.objects.get(pk=user_id)

        if user.role.remove:
            todo_time = get_object_or_404(Time, pk=todo_id)
            todo_time.delete()
            return rc.DELETED
        return rc.BAD_REQUEST


class MedicineHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = Medicines

    def read(self, request):
        return Medicines.objects.all()
