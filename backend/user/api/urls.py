from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)
from user.api.views import RegisterUser,CustomTokenRefreshView
urlpatterns = [
    path('register/',RegisterUser.as_view(), name="register"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/',  CustomTokenRefreshView.as_view(), name='token_refresh'),
   
]
