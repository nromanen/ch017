# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Removing unique constraint on 'User', fields ['login']
        db.delete_unique(u'todos_user', ['login'])

        # Deleting model 'User'
        db.delete_table(u'todos_user')

        # Removing M2M table for field todo on 'User'
        db.delete_table(db.shorten_name(u'todos_user_todo'))

        # Adding model 'Users'
        db.create_table(u'todos_users', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('last_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('foto', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('login', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('password', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('role', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['todos.Role'])),
            ('access_token', self.gf('django.db.models.fields.CharField')(max_length=40)),
        ))
        db.send_create_signal(u'todos', ['Users'])

        # Adding M2M table for field todo on 'Users'
        m2m_table_name = db.shorten_name(u'todos_users_todo')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('users', models.ForeignKey(orm[u'todos.users'], null=False)),
            ('todo', models.ForeignKey(orm[u'todos.todo'], null=False))
        ))
        db.create_unique(m2m_table_name, ['users_id', 'todo_id'])

        # Adding unique constraint on 'Users', fields ['login']
        db.create_unique(u'todos_users', ['login'])


    def backwards(self, orm):
        # Removing unique constraint on 'Users', fields ['login']
        db.delete_unique(u'todos_users', ['login'])

        # Adding model 'User'
        db.create_table(u'todos_user', (
            ('last_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('role', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['todos.Role'])),
            ('access_token', self.gf('django.db.models.fields.CharField')(max_length=40)),
            ('login', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('password', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('foto', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'todos', ['User'])

        # Adding M2M table for field todo on 'User'
        m2m_table_name = db.shorten_name(u'todos_user_todo')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('user', models.ForeignKey(orm[u'todos.user'], null=False)),
            ('todo', models.ForeignKey(orm[u'todos.todo'], null=False))
        ))
        db.create_unique(m2m_table_name, ['user_id', 'todo_id'])

        # Adding unique constraint on 'User', fields ['login']
        db.create_unique(u'todos_user', ['login'])

        # Deleting model 'Users'
        db.delete_table(u'todos_users')

        # Removing M2M table for field todo on 'Users'
        db.delete_table(db.shorten_name(u'todos_users_todo'))


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
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'time': ('django.db.models.fields.DateTimeField', [], {})
        },
        u'todos.todo': {
            'Meta': {'object_name': 'Todo'},
            'amount': ('django.db.models.fields.IntegerField', [], {'default': '1'}),
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'date_finished': ('django.db.models.fields.DateTimeField', [], {'null': 'True'}),
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