from django.shortcuts import render, get_object_or_404
from .models import Inventory
from django.views.generic import *
from .forms import StockForm


class StockList(ListView):
    model = Inventory
    template_name = 'stock/stock_list.html'
    context_object_name = 'stocks'


class StockCreate(CreateView):
    form_class = StockForm
    template_name = 'stock/stock_create.html'
    success_url = '/inventory/'
    success_message = "Story has been updated successfully!"

    def form_valid(self, form):
        return super().form_valid(form)


class StockUpdate(UpdateView):
    form_class = StockForm
    template_name = 'stock/stock_create.html'
    success_url = '/'
    success_message = "Story has been updated successfully!"

    def get_object(self):
        pk_ = self.kwargs.get('pk')
        return get_object_or_404(Inventory, pk=pk_)

    def form_valid(self, form):
        return super().form_valid(form)
