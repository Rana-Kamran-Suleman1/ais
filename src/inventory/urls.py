from django.urls import path
from .views import *

urlpatterns = [

    path('', StockList.as_view(), name='stock-list'),
    path('create/', StockCreate.as_view(), name='stock-create'),

]
