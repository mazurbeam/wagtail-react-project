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

from pages.blocks import BaseStreamBlock

class HomePage(Page):
    introduction = models.TextField(
        help_text='Text to describe the page',
        blank=True)

    # image = models.ForeignKey(
    #     'wagtailimages.Image',
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name='+',
    #     help_text='Landscape mode only; horizontal width between 1000px and 3000px.'
    # )
    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True
    )
    api_fields = [
        APIField('introduction'),
        APIField('body')
    ]

    content_panels = Page.content_panels + [
        FieldPanel('introduction', classname="full"),
        StreamFieldPanel('body'),
        # ImageChooserPanel('image'),
    ]
