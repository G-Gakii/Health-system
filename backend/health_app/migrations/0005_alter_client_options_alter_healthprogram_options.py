# Generated by Django 5.2 on 2025-04-26 20:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('health_app', '0004_client_doctor_enrollment_doctor_healthprogram_doctor'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='client',
            options={'ordering': ['-registration_date']},
        ),
        migrations.AlterModelOptions(
            name='healthprogram',
            options={'ordering': ['-created_at']},
        ),
    ]
