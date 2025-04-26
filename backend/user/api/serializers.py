from rest_framework import serializers
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    confirm_password=serializers.CharField(style={'input-type:password'},write_only=True)
    
    class Meta:
        model=User
        fields=['doctor_id',"fullName",'email','password','confirm_password',]
        extra_kwargs={'password':{"write_only":True}}
        
        
    def save(self):
            password=self.validated_data['password']
            confirm_password=self.validated_data['confirm_password']
            if password != confirm_password:
                raise serializers.ValidationError("password and password2 should be same")
            
            validated_data = {
            'email': self.validated_data['email'],
            'fullName': self.validated_data['fullName'],
            'doctor_id':self.validated_data['doctor_id'],
            
           
        }

            
            account=User(**validated_data)
            
            account.set_password(password)
            
            account.save()
            
            return account