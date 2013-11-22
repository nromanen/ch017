from piston.handler import BaseHandler
from models import User, Todo
from piston.utils import rc
from django.shortcuts import get_object_or_404
import base64


class AuthUserHandler(BaseHandler):
    allowed_methods = ('GET',)

class UserHandler(BaseHandler):
    allowed_methods = ('GET', )
    model = User

    def read(self, request, login=None, password=None):

        if login:
            password = base64.b64decode(password)
            return User.objects.get(login=login, password=password)


class GetUserHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = User

    def read(self, request, login=None):

        if login:
            return User.objects.get(login=login)


class UsersHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = User

    def read(self, request):

        if request:
            return User.objects.all()


class TodoHandler(BaseHandler):
    allowed_methods = ('GET', 'POST', 'PUT', 'DELETE')
    model = Todo
    fields = (
        'text',
        'date_created',
        'date_finished',
        'amount',
        ('time',
            ('time', )
        )
    )

    def read(self, request, todo_id=None):

        if todo_id:
            return get_object_or_404(Todo, pk=todo_id)
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
