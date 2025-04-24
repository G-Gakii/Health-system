from health_app.models import HealthProgram
from health_app.api.serializers import HealthProgramSerializer
from rest_framework import generics



class HealthProgramList(generics.ListCreateAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    
class HealthProgramDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    
