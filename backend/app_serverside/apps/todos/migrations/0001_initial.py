# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Role'
        db.create_table(u'todos_role', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('add', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('edit', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('remove', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('check', self.gf('django.db.models.fields.BooleanField')(default=False)),
        ))
        db.send_create_signal(u'todos', ['Role'])

        # Adding model 'User'
        db.create_table(u'todos_user', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('last_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('login', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('password', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('role', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['todos.Role'])),
        ))
        db.send_create_signal(u'todos', ['User'])

        # Adding unique constraint on 'User', fields ['login']
        db.create_unique(u'todos_user', ['login'])

        # Adding M2M table for field todo on 'User'
        m2m_table_name = db.shorten_name(u'todos_user_todo')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('user', models.ForeignKey(orm[u'todos.user'], null=False)),
            ('todo', models.ForeignKey(orm[u'todos.todo'], null=False))
        ))
        db.create_unique(m2m_table_name, ['user_id', 'todo_id'])

        # Adding model 'Todo'
        db.create_table(u'todos_todo', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('text', self.gf('django.db.models.fields.TextField')()),
            ('date_created', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('date_finished', self.gf('django.db.models.fields.DateTimeField')(null=True)),
            ('amount', self.gf('django.db.models.fields.IntegerField')(default=1)),
        ))
        db.send_create_signal(u'todos', ['Todo'])

        # Adding M2M table for field time on 'Todo'
        m2m_table_name = db.shorten_name(u'todos_todo_time')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('todo', models.ForeignKey(orm[u'todos.todo'], null=False)),
            ('time', models.ForeignKey(orm[u'todos.time'], null=False))
        ))
        db.create_unique(m2m_table_name, ['todo_id', 'time_id'])

        # Adding model 'Time'
        db.create_table(u'todos_time', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('time', self.gf('django.db.models.fields.DateTimeField')()),
        ))
        db.send_create_signal(u'todos', ['Time'])


    def backwards(self, orm):
        # Removing unique constraint on 'User', fields ['login']
        db.delete_unique(u'todos_user', ['login'])

        # Deleting model 'Role'
        db.delete_table(u'todos_role')

        # Deleting model 'User'
        db.delete_table(u'todos_user')

        # Removing M2M table for field todo on 'User'
        db.delete_table(db.shorten_name(u'todos_user_todo'))

        # Deleting model 'Todo'
        db.delete_table(u'todos_todo')

        # Removing M2M table for field time on 'Todo'
        db.delete_table(db.shorten_name(u'todos_todo_time'))

        # Deleting model 'Time'
        db.delete_table(u'todos_time')


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
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'text': ('django.db.models.fields.TextField', [], {}),
            'time': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['todos.Time']", 'symmetrical': 'False'})
        },
        u'todos.user': {
            'Meta': {'unique_together': "(['login'],)", 'object_name': 'User'},
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'login': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'role': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['todos.Role']"}),
            'todo': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['todos.Todo']", 'symmetrical': 'False'})
        }
    }

    complete_apps = ['todos']