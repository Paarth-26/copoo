from django.urls import path
from . import views

urlpatterns = [
    path('', views.mapping_form, name='mapping_form'),
    path('dashboard/', views.dashboard, name='dashboard')
]