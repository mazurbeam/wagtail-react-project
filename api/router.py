from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()

router.register(r'messages', views.ContactMessageView)
router.register(r'project_tags', views.ProjectTagView)
