from rest_framework import mixins, status
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from product.models import Product
from product.serializers import (CreateProductSerializer, DeleteProductSerializer, DetailProductSerializer,
                                 UpdateProductSerializer, )


# Create your views here.


class CreateProductView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = CreateProductSerializer

    def get_queryset(self):
        pass

    def post(self, request, *args, **kwargs):
        post_data = request.data
        # Creating product object
        try:
            product_obj = Product()
            product_obj.name = post_data.get('name')
            product_obj.description = post_data.get('description')
            product_obj.price = post_data.get('price')
            product_obj.iso_id = post_data.get('iso_id')
            product_obj.save()
            return Response({'status': status.HTTP_201_CREATED, 'message': 'Created successfully.'})
        except Exception as e:
            return Response({'status': status.HTTP_205_RESET_CONTENT, 'message': f'An error{e}'})


class UpdateProductView(mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Product.objects.all().order_by('id')
    serializer_class = UpdateProductSerializer

    def find_product_object(self, pk):
        obj = self.queryset.filter(id=pk).first()
        if obj is None:
            return Response({'status': status.HTTP_204_NO_CONTENT, 'message': 'No data found.'})
        else:
            return obj

    def put(self, request, *args, **kwargs):
        post_data = request.data
        try:
            product_id = post_data.get('product_id')
            product_obj = self.find_product_object(product_id)
            product_obj.name = post_data.get('name')
            product_obj.description = post_data.get('description')
            product_obj.price = post_data.get('price')
            product_obj.iso_id = post_data.get('iso_id')
            product_obj.save()
            return Response({'status': status.HTTP_200_OK, 'message': 'Updated successfully.'})
        except Exception as e:
            return Response({'status': status.HTTP_205_RESET_CONTENT, 'message': f'An error{e}'})


class DeleteProductView(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Product.objects.all().order_by('id')
    serializer_class = DeleteProductSerializer

    def find_product_object(self, pk):
        obj = self.queryset.filter(id=pk).first()
        if obj is None:
            return Response({'status': status.HTTP_204_NO_CONTENT, 'message': 'No data found.'})
        else:
            return obj

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        product_obj = self.find_product_object(product_id)
        product_obj.delete()
        return Response({'status': status.HTTP_200_OK, 'message': 'Deleted successfully.'})


class ListProductView(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Product.objects.all().order_by('id')
    serializer_class = DetailProductSerializer

    def post(self, request, *args, **kwargs):
        self.queryset = self.queryset
        paginator = PageNumberPagination()
        paginator.page_size = 1000
        result_page = paginator.paginate_queryset(self.queryset, request)
        serializer = DetailProductSerializer(result_page, many=True)
        return Response({'status': status.HTTP_200_OK, 'results': serializer.data})
