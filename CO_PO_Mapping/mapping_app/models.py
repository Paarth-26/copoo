from django.db import models

class CourseOutcome(models.Model):
    code = models.CharField(max_length=10)
    description = models.TextField()

class ProgramOutcome(models.Model):
    code = models.CharField(max_length=10)
    description = models.TextField()

class Mapping(models.Model):
    co = models.ForeignKey(CourseOutcome, on_delete=models.CASCADE)
    po = models.ForeignKey(ProgramOutcome, on_delete=models.CASCADE)
    justification = models.TextField(blank=True)
    attainment_score = models.FloatField(default=0)