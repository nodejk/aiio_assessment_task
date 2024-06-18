from http import HTTPMethod

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.catalogue.sub_product.SubProduct import SubProduct
from api.catalogue.sub_product.SubProductSerializers import SubProductCreateSerializer, SubProductSerializer


class SubProductView(viewsets.ViewSet):
    @action(
        methods=[HTTPMethod.POST],
        url_path="?create",
        detail=False,
    )
    def create_sub_product(self, request):

        serialized_data = SubProductCreateSerializer(data=request.data)

        if serialized_data.is_valid() is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        created_object = SubProduct.objects.create(**serialized_data.data)

        serialized_response = SubProductSerializer(created_object)

        return Response(serialized_response.data, status=status.HTTP_201_CREATED)
