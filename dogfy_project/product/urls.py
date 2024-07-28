from django.contrib import admin
from django.urls import path

from product.views import (CreateProductView, UpdateProductView, DeleteProductView, ListProductView, )

urlpatterns = [
    path('create/', CreateProductView.as_view(), name='create'),
    path('update/', UpdateProductView.as_view(), name='create'),
    path('delete/', DeleteProductView.as_view(), name='create'),
    path('list/', ListProductView.as_view(), name='create'),
]