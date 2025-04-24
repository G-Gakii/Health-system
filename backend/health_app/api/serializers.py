from rest_framework import serializers
from health_app.models import HealthProgram,Client,Enrollment
from rest_framework import status


class HealthProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model=HealthProgram
        fields='__all__'
        
        
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields='__all__'
        
        
        
class EnrollmentSerializer(serializers.ModelSerializer):
    # pass program name rather than id
     program_name=serializers.CharField(write_only=True)
     client_id = serializers.CharField(write_only=True)
     client = serializers.StringRelatedField(read_only=True)
     program = serializers.StringRelatedField(read_only=True)

     class Meta:
        model=Enrollment
        fields=["id" ,'client_id', 'program_name', 'enrollment_date',
            'client', 'program']
        
        
     def validate(self,data):
        client =Client.objects.filter(client_id=data['client_id']).first()
        program=HealthProgram.objects.filter(name__iexact=data['program_name']).first()
        
        if client and program:
            if Enrollment.objects.filter(client=client,program=program).exists():
                raise serializers.ValidationError("client is already enrolled in this program")
            
        return data
        


        
        
     def create(self,validated_data):
         client=Client.objects.get(client_id=validated_data['client_id'])
         program=HealthProgram.objects.get(name__iexact=validated_data['program_name'])
         return Enrollment.objects.create( program=program,client=client)
     
     def update(self, instance, validated_data):
        client = Client.objects.get(client_id=validated_data['client_id'])
        program = HealthProgram.objects.get(name__iexact=validated_data['program_name'])
        instance.client = client
        instance.program = program
        instance.save()
        return instance
