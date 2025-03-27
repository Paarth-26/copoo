from django.shortcuts import render, redirect
from .models import Mapping, CourseOutcome, ProgramOutcome
import spacy

nlp = spacy.load('en_core_web_sm')

def generate_justification(co, po):
    doc = nlp(f"Map {co} to {po}")
    justification = f"{co} aligns with {po} due to shared learning objectives and assessment criteria."
    return justification

def mapping_form(request):
    if request.method == 'POST':
        co_id = request.POST.get('co')
        po_id = request.POST.get('po')
        co = CourseOutcome.objects.get(id=co_id)
        po = ProgramOutcome.objects.get(id=po_id)
        justification = generate_justification(co.code, po.code)
        mapping = Mapping(co=co, po=po, justification=justification)
        mapping.save()
        return redirect('dashboard')
    cos = CourseOutcome.objects.all()
    pos = ProgramOutcome.objects.all()
    return render(request, 'mapping_form.html', {'cos': cos, 'pos': pos})

def dashboard(request):
    mappings = Mapping.objects.all()
    return render(request, 'dashboard.html', {'mappings': mappings})