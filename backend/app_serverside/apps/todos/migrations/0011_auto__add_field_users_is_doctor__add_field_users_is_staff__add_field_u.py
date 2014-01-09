# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Users.is_doctor'
        db.add_column('todos_users', 'is_doctor',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'Users.is_staff'
        db.add_column('todos_users', 'is_staff',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'Users.is_active'
        db.add_column('todos_users', 'is_active',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Users.is_doctor'
        db.delete_column('todos_users', 'is_doctor')

        # Deleting field 'Users.is_staff'
        db.delete_column('todos_users', 'is_staff')

        # Deleting field 'Users.is_active'
        db.delete_column('todos_users', 'is_active')


    models = {
        'todos.medicines': {
            'Meta': {'object_name': 'Medicines'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        'todos.role': {
            'Meta': {'object_name': 'Role'},
            'add': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'check': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'edit': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'remove': ('django.db.models.fields.BooleanField', [], {'default': 'False'})
        },
        'todos.time': {
            'Meta': {'object_name': 'Time'},
            'datetime': ('django.db.models.fields.DateTimeField', [], {}),
            'done': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'todos.todo': {
            'Meta': {'object_name': 'Todo'},
            'datetime_created': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'datetime_finished': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'text': ('django.db.models.fields.TextField', [], {}),
            'time': ('django.db.models.fields.related.ManyToManyField', [], {'to': "orm['todos.Time']", 'symmetrical': 'False'})
        },
        'todos.users': {
            'Meta': {'unique_together': "(['login'],)", 'object_name': 'Users'},
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'foto': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_doctor': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'login': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'role': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['todos.Role']"}),
            'todo': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'to': "orm['todos.Todo']", 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['todos']