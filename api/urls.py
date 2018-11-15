from django.urls import path
from .views import ContactMessageView, ProjectTagView


urlpatterns = [
    path('messages/', ContactMessageView.as_view(), name="messages-all"),
    path("project_tags/", ProjectTagView.as_view(), name='project-tags')
]