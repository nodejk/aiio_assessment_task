from django.db import models

from api.catalogue.product.Product import Product


class SubCategory(models.Model):
    class Meta:
        verbose_name = "SubCategory"
        verbose_name_plural = "SubCategories"

    name = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
