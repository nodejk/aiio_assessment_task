from rest_framework import serializers

from api.catalogue.product.Product import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
        )

    id = serializers.IntegerField()
