from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.core.validators import RegexValidator

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self,doctor_id:str,fullName:str,email:str,created_at:str,password:str,is_staff=False,is_superuser=False, )->'User':
        if not fullName:
            raise ValueError("Full name required")
        if not doctor_id:
            raise ValueError("Doctor id required")
        if not email:
            raise ValueError("Email required")
        if not password:
            raise ValueError("Password required")
        
        user=self.model(email=self.normalize_email(email))
        user.fullName=fullName
        user.set_password(password)
        user.doctor_id=doctor_id
        user.is_staff=is_staff
        user.is_superuser=is_superuser
        
        user.save()
        return user
    def create_superuser(self,doctor_id:str,fullName:str,email:str,password:str):
        user=self.create_user(
            fullName=fullName,
            email=email,
            password=None,
            doctor_id=doctor_id
            
        )
        if password:
            user.set_password(password)
            
        user.save()
        return user

class User(AbstractUser):
    username = None 
    doctor_id=models.CharField(max_length=10,unique=True,primary_key=True) # assume doctors have unique indentifier
    fullName=models.CharField(max_length=255)
    email=models.EmailField(max_length=255,unique=True)
    password=models.CharField(max_length=255,validators=[RegexValidator("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$",message="password must have min 8 characters, at least one letter, one number and one special character:")])
    created_at=models.DateTimeField(auto_now_add=True)
    
    objects=UserManager()
    
    USERNAME_FIELD = 'email'  # login with email
    REQUIRED_FIELDS = ['doctor_id', 'fullName']
    
    
    def __str__(self):
       return self.email
    