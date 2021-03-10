from django.shortcuts import render, get_object_or_404
from .models import Sale
from django.views.generic import *
from .forms import SaleForm


class SaleList(ListView):
    model = Sale
    template_name = 'sale/sale_list.html'
    context_object_name = 'sale'


class SaleCreate(CreateView):
    form_class = SaleForm
    template_name = 'sale/sale_create.html'
    success_url = '/sale/'
    success_message = "Story has been updated successfully!"

    def form_valid(self, form):
        return super().form_valid(form)


class SaleUpdate(UpdateView):
    form_class = SaleForm
    template_name = 'sale/sale_create.html'
    success_url = '/'
    success_message = "Story has been updated successfully!"

    def get_object(self):
        pk_ = self.kwargs.get('pk')
        return get_object_or_404(Inventory, pk=pk_)

    def form_valid(self, form):
        return super().form_valid(form)
