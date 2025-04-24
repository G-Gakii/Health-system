from rest_framework import serializers
from health_app.models import HealthProgram,Client


class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model=HealthProgram
        fields='__all__'
        
        
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields='__all__'