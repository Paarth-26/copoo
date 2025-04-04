# Generated by Django 5.1.7 on 2025-03-26 05:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CourseOutcome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProgramOutcome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Mapping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('justification', models.TextField(blank=True)),
                ('attainment_score', models.FloatField(default=0)),
                ('co', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mapping_app.courseoutcome')),
                ('po', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mapping_app.programoutcome')),
            ],
        ),
    ]
