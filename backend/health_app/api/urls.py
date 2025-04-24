from django.urls import path
from health_app.api.views import HealthProgramList,HealthProgramDetails,ClientList,ClientDetails

urlpatterns = [
    path("program/",HealthProgramList.as_view(),name="health_program"),
    path("program/<uuid:pk>",HealthProgramDetails.as_view(),name="health_program_details"),
    path("client/",ClientList.as_view(),name="client"),
    path("client/<str:pk>",ClientDetails.as_view(),name="client_details")
]
