from rest_framework.views import APIView
from user.api.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
class RegisterUser(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            account=serializer.save()
            
            data['response']="registered successfully"
            data['fullName']=account.fullName
            data['email']=account.email
           
           
            refresh = RefreshToken.for_user(account)
            data['access']=str(refresh.access_token)
            data['refresh']=str(refresh)
           
            return Response(data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
    
    
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except ObjectDoesNotExist:
            raise InvalidToken("User not found. Token is invalid.")
        