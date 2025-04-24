from django.urls import path
from health_app.api.views import HealthProgramList,HealthProgramDetails,ClientList,ClientDetails,EnrollmentDetails,EnrollmentList

urlpatterns = [
    #program paths
    path("program/",HealthProgramList.as_view(),name="health_program"),
    path("program/<uuid:pk>",HealthProgramDetails.as_view(),name="health_program_details"),
    #client paths
    path("client/",ClientList.as_view(),name="client"),
    path("client/<str:pk>",ClientDetails.as_view(),name="client_details"),
    
    # enronment path
    path("enroll/",EnrollmentList.as_view(),name="client"),
    path("enroll/<uuid:pk>",EnrollmentDetails.as_view(),name="client_details")
]
