from django import forms
from django.db import models
from django.db.models import fields
from .models import Inventory


class StockForm(forms.ModelForm):

    class Meta:
        model = Inventory
        fields = '__all__'
