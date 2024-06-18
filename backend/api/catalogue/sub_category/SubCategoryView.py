from http import HTTPMethod

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.catalogue.sub_product.SubProduct import SubProduct
from api.catalogue.sub_product.SubProductSerializers import SubProductSerializer


class SubCategoryView(viewsets.ViewSet):
    @action(
        methods=[HTTPMethod.GET],
        url_path="(?P<sub_category_id>[^/.]+)/sub-products/all",
        detail=False,
    )
    def get_all_sub_products(self, request, sub_category_id: int):
        sub_products = SubProduct.objects.filter(sub_category_id=sub_category_id)

        serialized_data = SubProductSerializer(sub_products, many=True)

        return Response(serialized_data.data, status=status.HTTP_200_OK)
