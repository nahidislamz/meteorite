# Generated by Django 3.1.5 on 2021-01-20 15:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogpost',
            old_name='excerpt',
            new_name='subtitle',
        ),
    ]