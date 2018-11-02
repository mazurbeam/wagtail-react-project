from wagtail.api.v2.endpoints import BaseAPIEndpoint
from .models import ContactMessage
from rest_framework import mixins


class ContactMessageAPIEndpoint(mixins.CreateModelMixin, BaseAPIEndpoint):
    model = ContactMessage

    def create(self, request):
	    print('create message', request)