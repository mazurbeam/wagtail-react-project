from django.shortcuts import render
from rest_framework import viewsets
from .models import ContactMessage
from .serializers import ContactMessageSerializer

# Create your views here.

class ContactMessageView(viewsets.ModelViewSet):

	queryset = ContactMessage.objects.all()
	serializer_class = ContactMessageSerializer
	