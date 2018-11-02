from wagtail.api.v2.endpoints import BaseAPIEndpoint
from .models import ContactMessage


class ContactMessageAPIEndpoint(BaseAPIEndpoint):
    model = ContactMessage