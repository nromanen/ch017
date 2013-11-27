from piston.handler import BaseHandler
from models import Users, Todo, Role
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import Http404
from piston.utils import rc
import base64


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
                    ('time', )
                )
            )
        )
    )

    def users_by_role(self, role):
        return Users.objects.filter(role__name=role)

    def get_user(self, login=None, password=None):
        if login and password:
            #password = base64.b64decode(password)
            return Users.objects.get(login=login, password=password)

    def read(self, request, role=None, login=None, password=None):
        if role:
            try:
                return self.users_by_role(role)
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
        'text',
        'date_created',
        'date_finished',
        'amount',
        'done',
        ('time',
            ('time', )
        )
    )

    def read(self, request, login=None, password=None):

        if login and password:
            password = base64.b64decode(password)
            user = Users.objects.get(login=login, password=password)
            if user:
                return user.todo.all()
        else:
            return Todo.objects.all()

    def create(self, request):
        new_todo = request.POST['new_todo']

        #here must to be more code to implement this method
        todo_item, created = Todo.objects.get_or_create(new_todo)

        if created:
            return todo_item
        else:
            response = rc.BAD_REQUEST
            response.write('Record already exists')
            return response

    def update(self, request, post_id):
        todo_item = get_object_or_404(Todo, pk=post_id)
        #here must to be more code to update all attr of todo_item
        todo_item.text = request.POST['text']
        todo_item.save()

        return todo_item

    def delete(self, request, post_id):
        todo_item = get_object_or_404(Todo, pk=post_id)

        todo_item.delete()

        return rc.DELETED