from django.conf.urls.defaults import *
from piston.resource import Resource
from apps.todos.views import AuthUserHandler, GetUserHandler, UsersHandler, TodoHandler


auth_user_handler = Resource(AuthUserHandler)
get_user_handler = Resource(GetUserHandler)
users_handler = Resource(UsersHandler)
todo_handler = Resource(TodoHandler)

urlpatterns = patterns('',
   url(r'^auth/user/(?P<login>[^/]+)/(?P<password>[^/]+)/', auth_user_handler),
   url(r'^get/user/(?P<login>[^/]+)', get_user_handler),
   url(r'^users/', users_handler),
   url(r'^todo/(?P<todo_id>[^/]+)/', todo_handler),
   url(r'^todos/', todo_handler)
)
