from django.db import models

from api.catalogue.sub_category.SubCategory import SubCategory


class SubProduct(models.Model):
    class Meta:
        verbose_name = "SubProduct"
        verbose_name_plural = "SubProducts"

    name = models.CharField(max_length=255)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
