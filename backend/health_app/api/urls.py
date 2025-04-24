from django.urls import path
from health_app.api.views import HealthProgramList,HealthProgramDetails

urlpatterns = [
    path("program/",HealthProgramList.as_view(),name="health_program"),
    path("program/<uuid:pk>",HealthProgramDetails.as_view(),name="health_program_details")
]
