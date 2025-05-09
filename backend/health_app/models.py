from django.db import models
import uuid
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from user.models import User

Gender=(
    ('F','female'),
    ('M','male'),
    ('O','others')
)

# Create your models here.
class HealthProgram(models.Model):
    id=models.UUIDField(primary_key=True,unique=True,default=uuid.uuid4,editable=False)
    doctor=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True) #doctor who originally added the program
    name=models.CharField(max_length=100,unique=True)
    description=models.TextField(null=True,blank=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.name = self.name.lower()  # Convert to lowercase before saving
        super().save(*args, **kwargs)
        
    class Meta:
        ordering = ['-created_at']

    
    
    
    
class Client(models.Model):
    client_id=models.CharField(max_length=20,unique=True,primary_key=True) #assume the client are given a unique indentifier like hospital or clinic registration number
    fullName=models.CharField(max_length=100)
    doctor=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True) #doctor who originally added the client
    age=models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(120)])
    phone_number=models.CharField(max_length=15,unique=True,validators=[RegexValidator(r'^\+?1?\d{9,15}$', message="Enter a valid phone number.")]
)
    gender=models.CharField(max_length=1,choices=Gender)
    registration_date=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.fullName
    
    class Meta:
        ordering = ['-registration_date']
    
class Enrollment(models.Model):
    id=models.UUIDField(primary_key=True,unique=True,default=uuid.uuid4,editable=False)
    doctor=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True) #doctor who originally enrolled the patient
    client=models.ForeignKey(Client,on_delete=models.CASCADE,related_name="programs")
    program=models.ForeignKey(HealthProgram,on_delete=models.CASCADE)
    enrollment_date=models.DateTimeField(auto_now_add=True)
    updated_date=models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together=("client","program")
    
    
    def __str__(self):
        return f"{self.client.fullName} enrolled in {self.program.name} on {self.   enrollment_date.strftime('%Y-%m-%d')}"

    