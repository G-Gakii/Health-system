from rest_framework import serializers
from health_app.models import HealthProgram


class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model=HealthProgram
        fields='__all__'