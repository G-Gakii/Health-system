from health_app.models import HealthProgram,Client,Enrollment
from health_app.api.serializers import HealthProgramSerializer,ClientSerializer,EnrollmentSerializer
from rest_framework import generics
from rest_framework import filters


# Handles listing and creating health programs
class HealthProgramList(generics.ListCreateAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer

# Handles retrieving, updating, or deleting a single health program    
class HealthProgramDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    

# Handles listing and creating clients
class ClientList(generics.ListCreateAPIView):
    queryset=Client.objects.all()
    serializer_class=ClientSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['fullName', 'client_id']
    
# Handles retrieving, updating, or deleting a single client    
class ClientDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Client.objects.all()
    serializer_class=ClientSerializer

# Handles listing and creating enrollments    
class EnrollmentList(generics.ListCreateAPIView):
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['program__name']
    
# Handles retrieving, updating, or deleting a single enrollment    
class EnrollmentDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer