# Generated by Django 2.0.8 on 2018-09-12 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20180911_2006'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogindexpage',
            name='icon',
            field=models.CharField(default='home', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blogpage',
            name='icon',
            field=models.CharField(default='home', max_length=20),
            preserve_default=False,
        ),
    ]
