from django.db import models


class SavedSelection(models.Model):
    class Meta:
        verbose_name = "SavedSelection"
        verbose_name_plural = "SavedSelections"

    saved_view = models.JSONField()
