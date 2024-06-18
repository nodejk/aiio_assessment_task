from http import HTTPMethod

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.catalogue.product.Product import Product
from api.catalogue.product.ProductSerializers import ProductSerializer
from api.catalogue.sub_category.SubCategory import SubCategory
from api.catalogue.sub_category.SubCategorySerializers import SubCategorySerializer


class ProductView(viewsets.ViewSet):
    @action(
        methods=[HTTPMethod.GET],
        url_path="all",
        detail=False,
    )
    def get_all_products(self, request):
        all_products = Product.objects.all()
        serialized_data = ProductSerializer(all_products, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)

    @action(
        methods=[HTTPMethod.GET],
        url_path="(?P<product_id>[^/.]+)/sub-categories/all",
        detail=False,
    )
    def get_all_sub_categories(self, request, product_id: int):
        sub_categories = SubCategory.objects.filter(product_id=product_id)
        serialized_data = SubCategorySerializer(sub_categories, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)
