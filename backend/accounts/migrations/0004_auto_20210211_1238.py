# Generated by Django 3.1.5 on 2021-02-11 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20210211_1209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='profile_pic',
            field=models.ImageField(default='profile.jpg', null=True, upload_to=''),
        ),
    ]
