import json
from http import HTTPMethod

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.catalogue.saved_selection.SavedSelection import SavedSelection
from api.catalogue.saved_selection.SavedSelectionSerializers import SavedSelectionCreateSerializer


class SavedSelectionView(viewsets.ViewSet):
    @action(
        methods=[HTTPMethod.POST],
        url_path="?create",
        detail=False,
    )
    def create_sub_product(self, request):
        serialized_data = SavedSelectionCreateSerializer(data=request.data)

        if serialized_data.is_valid() is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        json_dump = json.dumps(serialized_data.data)

        saved_selection = SavedSelection.objects.create(
            saved_view=json_dump,
        )

        return Response(True, status=status.HTTP_201_CREATED)
