from django.db import models
from mongoengine import Document, StringField

# Create your models here.

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField()

    meta = {'collection': 'users'}
