from django.shortcuts import render
from rest_framework import viewsets
from .models import ContactMessage
from .serializers import ContactMessageSerializer, ProjectTagSerializer
from pages.projects.models import ProjectPage, ProjectPageTag

# views.py

# Create your views here.

class ContactMessageView(viewsets.ModelViewSet):

	queryset = ContactMessage.objects.all()
	serializer_class = ContactMessageSerializer


class ProjectTagView(viewsets.ModelViewSet):
	queryset = ProjectPage.objects.all()
	serializer_class = ProjectTagSerializer