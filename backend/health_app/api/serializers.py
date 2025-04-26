from rest_framework import serializers
from health_app.models import HealthProgram,Client,Enrollment
from rest_framework import status


class HealthProgramSerializer(serializers.ModelSerializer):
    doctor=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=HealthProgram
        fields='__all__'
        read_only_fields = ['doctor']
        
        

        
        
        
class EnrollmentSerializer(serializers.ModelSerializer):
       # These fields are used for input only, not saved directly to the Enrollment model
     program_name=serializers.CharField(write_only=True)
     client_id = serializers.CharField(write_only=True)
     doctor=serializers.StringRelatedField()
     
      # These are for readable output
     client = serializers.StringRelatedField(read_only=True)
     program = serializers.StringRelatedField(read_only=True)
    

     class Meta:
        model=Enrollment
        fields=["id" ,'client_id', 'program_name', 'enrollment_date',
            'client', 'program','doctor']
        
        
        #check if client is already registered for the program
     def validate(self,data):
        
        client =Client.objects.filter(client_id=data['client_id']).first()
        
        
        program=HealthProgram.objects.filter(name__iexact=data['program_name']).first()
        
        if not client:
            raise serializers.ValidationError({"client_id": "Client with given ID does not exist."})
        
        if not program:
            raise serializers.ValidationError({"program_name": "Health program does not exist."})

        
       
        existing_enrollment =Enrollment.objects.filter(client=client,program=program).exists()
        if existing_enrollment and not self.instance:
             raise serializers.ValidationError("client is already enrolled in this program")
            
        return data
        


        
        
     def create(self,validated_data):
         client=Client.objects.get(client_id=validated_data['client_id'])
         program=HealthProgram.objects.get(name__iexact=validated_data['program_name'])
         doctor = validated_data.pop('doctor', None)  # <--- capture doctor if passed

         enrollment = Enrollment(
        client=client,
        program=program,
        doctor=doctor  # <--- set the doctor
        
    )
         enrollment.save()
         return enrollment
        #  return Enrollment.objects.create( program=program,client=client)
     
     def update(self, instance, validated_data):
        client = Client.objects.get(client_id=validated_data['client_id'])
        program = HealthProgram.objects.get(name__iexact=validated_data['program_name'])
        instance.client = client
        instance.program = program
        instance.save()
        return instance
    
class ClientSerializer(serializers.ModelSerializer):
    doctor=serializers.StringRelatedField(read_only=True)
      # Nested serializer for enrolled programs
    programs=EnrollmentSerializer(many=True,read_only=True)
    class Meta:
        model=Client
        fields= ['client_id', 'fullName', 'age', 'phone_number', 'gender', 'registration_date', 'updated_at', 'programs','doctor']
        read_only_fields = ['doctor']
