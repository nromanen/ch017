from django.conf.urls.defaults import *
from piston.resource import Resource
from apps.todos.views import UserHandler

user_handler = Resource(UserHandler)

urlpatterns = patterns('',
   url(r'^user/(?P<todo_id>[^/]+)/', user_handler),
   url(r'^users/', user_handler)
)
