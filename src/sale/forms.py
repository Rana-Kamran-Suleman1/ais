from django import forms
from django.db import models
from django.db.models import fields
from .models import  Sale


class SaleForm(forms.ModelForm):

    class Meta:
        model = Sale
        fields = '__all__'
