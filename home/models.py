from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField, StreamField

from wagtail.api import APIField

from wagtail.admin.edit_handlers import (
    FieldPanel,
    FieldRowPanel,
    InlinePanel,
    MultiFieldPanel,
    PageChooserPanel,
    StreamFieldPanel,
)
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.api.fields import ImageRenditionField

from pages.blocks import BaseStreamBlock

class HomePage(Page):
    name = models.TextField(
        help_text='Your Name',
        blank=True)
    subtitle = models.TextField(
        help_text='Ex: Full Stack Developer',
	    blank=True
    )
    introduction = models.TextField(
        help_text='A paragraph intro',
        blank=True)

    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Landscape mode only; horizontal width between 1000px and 3000px.'
    )
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True, null=True
    )
    api_fields = [
        APIField('name'),
        APIField('subtitle'),
        APIField('introduction'),
        APIField('body'),
        APIField('image_thumbnail', serializer=ImageRenditionField('fill-350x350', source='image')),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('name'),
        FieldPanel('subtitle'),
        FieldPanel('introduction', classname="full"),
        StreamFieldPanel('body'),
        ImageChooserPanel('image'),
        # ImageChooserPanel('image'),
    ]
