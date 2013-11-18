from piston.handler import BaseHandler
from models import User


class UserHandler(BaseHandler):
    allowed_methods = ('GET',)
    model = User

    def read(self, request, todo_id=None):

        if todo_id:
            return User.objects.get(pk=todo_id)
        else:
            return User.objects.all()
