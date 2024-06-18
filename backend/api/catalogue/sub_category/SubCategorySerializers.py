from rest_framework import serializers

from api.catalogue.sub_category.SubCategory import SubCategory


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = (
            "id",
            "name",
        )

    id = serializers.IntegerField()
