from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
import settings
admin.autodiscover()


urlpatterns = patterns('',
    url(r'^api/', include('app_serverside.apps.todos.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    'document_root': settings.MEDIA_ROOT,
    }),
)
