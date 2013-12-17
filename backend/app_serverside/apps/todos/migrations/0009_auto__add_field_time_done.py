# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Time.done'
        db.add_column(u'todos_time', 'done',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Time.done'
        db.delete_column(u'todos_time', 'done')


    models = {
        u'todos.medicines': {
            'Meta': {'object_name': 'Medicines'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
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
            'done': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
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