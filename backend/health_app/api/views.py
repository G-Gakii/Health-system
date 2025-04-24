from health_app.models import HealthProgram,Client,Enrollment
from health_app.api.serializers import HealthProgramSerializer,ClientSerializer,EnrollmentSerializer
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
    
class EnrollmentList(generics.ListCreateAPIView):
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer
    
    
class EnrollmentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer