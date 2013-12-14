# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Todo.date_finished'
        db.delete_column(u'todos_todo', 'date_finished')

        # Deleting field 'Todo.date_created'
        db.delete_column(u'todos_todo', 'date_created')

        # Adding field 'Todo.datetime_created'
        db.add_column(u'todos_todo', 'datetime_created',
                      self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime(2013, 12, 12, 0, 0), blank=True),
                      keep_default=False)

        # Adding field 'Todo.datetime_finished'
        db.add_column(u'todos_todo', 'datetime_finished',
                      self.gf('django.db.models.fields.DateTimeField')(null=True),
                      keep_default=False)

        # Deleting field 'Time.time'
        db.delete_column(u'todos_time', 'time')

        # Adding field 'Time.datetime'
        db.add_column(u'todos_time', 'datetime',
                      self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2013, 12, 12, 0, 0)),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'Todo.date_finished'
        db.add_column(u'todos_todo', 'date_finished',
                      self.gf('django.db.models.fields.DateTimeField')(null=True),
                      keep_default=False)

        # Adding field 'Todo.date_created'
        db.add_column(u'todos_todo', 'date_created',
                      self.gf('django.db.models.fields.DateTimeField')(auto_now=True, default=datetime.datetime(2013, 12, 12, 0, 0), blank=True),
                      keep_default=False)

        # Deleting field 'Todo.datetime_created'
        db.delete_column(u'todos_todo', 'datetime_created')

        # Deleting field 'Todo.datetime_finished'
        db.delete_column(u'todos_todo', 'datetime_finished')

        # Adding field 'Time.time'
        db.add_column(u'todos_time', 'time',
                      self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2013, 12, 12, 0, 0)),
                      keep_default=False)

        # Deleting field 'Time.datetime'
        db.delete_column(u'todos_time', 'datetime')


    models = {
        u'todos.role': {
            'Meta': {'object_name': 'Role'},
            'add': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'check': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'edit': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'remove': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        u'todos.time': {
            'Meta': {'object_name': 'Time'},
            'datetime': ('django.db.models.fields.DateTimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'todos.todo': {
            'Meta': {'object_name': 'Todo'},
            'amount': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'datetime_created': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'datetime_finished': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'done': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'text': ('django.db.models.fields.TextField', [], {}),
            'time': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['todos.Time']", 'symmetrical': 'False'})
        },
        u'todos.users': {
            'Meta': {'unique_together': "(['login'],)", 'object_name': 'Users'},
            'access_token': ('django.db.models.fields.CharField', [], {'max_length': '40'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'foto': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'login': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'role': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['todos.Role']"}),
            'todo': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': u"orm['todos.Todo']", 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['todos']