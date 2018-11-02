from django.urls import path
from .views import ContactMessageView


urlpatterns = [
    path('messages/', ContactMessageView.as_view(), name="messages-all")
]