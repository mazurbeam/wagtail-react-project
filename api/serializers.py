from rest_framework import serializers
from .models import ContactMessage
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from pages.projects.models import ProjectPageTag, ProjectPage

class ContactMessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = ContactMessage
		fields = ("name", "email", "message")


class ProjectTagSerializer(TaggitSerializer, serializers.ModelSerializer):
	tags = TagListSerializerField()
	
	class Meta:
		model = ProjectPage
		fields = ("tags", "id")
