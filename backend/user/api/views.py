from rest_framework.views import APIView
from user.api.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

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
        