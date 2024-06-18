from rest_framework import serializers

from api.catalogue.product.ProductSerializers import ProductSerializer
from api.catalogue.saved_selection.SavedSelection import SavedSelection
from api.catalogue.sub_category.SubCategorySerializers import SubCategorySerializer
from api.catalogue.sub_product.SubProductSerializers import SubProductSerializer


class SavedSelectionCreateSerializer(serializers.Serializer):
    saved_products = ProductSerializer(many=True)
    saved_sub_categories = SubCategorySerializer(many=True)
    saved_sub_products = SubProductSerializer(many=True)


class SavedSelectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedSelection
        fields = (
            "id",
            "saved_view",
        )
