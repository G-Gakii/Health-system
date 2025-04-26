from health_app.models import HealthProgram,Client,Enrollment
from health_app.api.serializers import HealthProgramSerializer,ClientSerializer,EnrollmentSerializer
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated


# Handles listing and creating health programs
class HealthProgramList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    
    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)

# Handles retrieving, updating, or deleting a single health program    
class HealthProgramDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=HealthProgram.objects.all()
    serializer_class =HealthProgramSerializer
    
    
    def perform_update(self, serializer):
        serializer.save()
    

# Handles listing and creating clients
class ClientList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset=Client.objects.all()
    serializer_class=ClientSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['fullName', 'client_id']
    
    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)
    
# Handles retrieving, updating, or deleting a single client    
class ClientDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset=Client.objects.all()
    serializer_class=ClientSerializer
    
    def perform_update(self, serializer):
        serializer.save()

# Handles listing and creating enrollments    
class EnrollmentList(generics.ListCreateAPIView):
    permission_classes=IsAuthenticatedOrReadOnly
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['program__name']
    
    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)
    
# Handles retrieving, updating, or deleting a single enrollment    
class EnrollmentDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes=IsAuthenticatedOrReadOnly
    queryset=Enrollment.objects.all()
    serializer_class=EnrollmentSerializer
    
    
    def perform_update(self, serializer):
        serializer.save()