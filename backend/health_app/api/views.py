from health_app.models import HealthProgram,Client
from health_app.api.serializers import HealthProgramSerializer,ClientSerializer
from rest_framework import generics



class HealthProgramList(generics.ListCreateAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    
class HealthProgramDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    


class ClientList(generics.ListCreateAPIView):
    queryset=Client.objects.all()
    serializer_class=ClientSerializer
    
    
class ClientDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Client.objects.all()
    serializer_class=ClientSerializer