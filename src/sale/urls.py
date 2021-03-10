from django.urls import path
from .views import *

urlpatterns = [

    path('', SaleList.as_view(), name='sale-list'),
    path('create/', SaleCreate.as_view(), name='sale-create'),

]
