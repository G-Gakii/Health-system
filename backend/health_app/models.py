from django.db import models
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

Gender=(
    ('F','female'),
    ('M','male'),
    ('O','others')
)

# Create your models here.
class HealthProgram(models.Model):
    id=models.UUIDField(primary_key=True,unique=True,default=uuid.uuid4,editable=False)
    name=models.CharField(max_length=100,unique=True)
    description=models.TextField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
    
    
class Client(models.Model):
    client_id=models.CharField(max_length=20,unique=True,primary_key=True) #assume the client are given a unique indentifier like hospital or clinic registration number
    fullName=models.CharField(max_length=100)
    age=models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(120)])
    phone_number=models.CharField(max_length=15,unique=True,validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid phone number.")]
)
    gender=models.CharField(max_length=1,choices=Gender)
    registration_date=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.fullName
    
class Enrollment(models.Model):
    id=models.UUIDField(primary_key=True,unique=True,default=uuid.uuid4,editable=False)
    client=models.ForeignKey(Client,on_delete=models.CASCADE)
    program=models.ForeignKey(HealthProgram,on_delete=models.CASCADE)
    enrollment_date=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"{self.client.fullName} enrolled in {self.program.name} on {self.   enrollment_date.strftime('%Y-%m-%d')}"

    