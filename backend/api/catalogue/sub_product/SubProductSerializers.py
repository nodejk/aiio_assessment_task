from rest_framework import serializers

from api.catalogue.sub_product.SubProduct import SubProduct


class SubProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubProduct
        fields = (
            "id",
            "name",
        )

    id = serializers.IntegerField()


class SubProductCreateSerializer(serializers.Serializer):
    sub_category_id = serializers.IntegerField()
    name = serializers.CharField()
