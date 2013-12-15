from django.conf.urls.defaults import *
from piston.resource import Resource
from apps.todos.views import UserHandler, TodoHandler, MedicineHandler


user_handler = Resource(UserHandler)
todo_handler = Resource(TodoHandler)
medicine_handler = Resource(MedicineHandler)

urlpatterns = patterns('',
   url(r'^user/(?P<login>[^/]+)/(?P<password>[^/]+)/', user_handler),
   url(r'^users_by_role/(?P<role>[^/]+)/', user_handler),
   url(r'^users/', user_handler),
   url(r'^todo/(?P<login>[^/]+)/(?P<password>[^/]+)/', todo_handler),
   url(r'^todos/', todo_handler),
   url(r'^medicines/', medicine_handler)
)