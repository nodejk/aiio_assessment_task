from rest_framework.routers import DefaultRouter

from api.catalogue.product.ProductView import ProductView
from api.catalogue.saved_selection.SavedSelectionView import SavedSelectionView
from api.catalogue.sub_category.SubCategoryView import SubCategoryView
from api.catalogue.sub_product.SubProductView import SubProductView

router = DefaultRouter()

router.register(r"products", ProductView, basename="products")
router.register(r"sub-categories", SubCategoryView, basename="sub-categories")
router.register(r"sub-products", SubProductView, basename="sub-products")
router.register(r"saved-selections", SavedSelectionView, basename="saved-selections")

urlpatterns = [
    *router.urls,
]
