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

    hero_cta = models.CharField(
        verbose_name='Hero CTA',
        max_length=255,
        null=True,
        blank=True,
        help_text='Text to display on Call to Action'
    )
    hero_cta_link = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Hero CTA link',
        help_text='Choose a page to link to for the Call to Action'
    )

    body = StreamField(
        BaseStreamBlock(), verbose_name="Page body", blank=True, null=True
    )

    # Promo section of the HomePage
    promo_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Promo image'
    )
    promo_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text='Title to display above the promo copy'
    )
    promo_text = RichTextField(
        null=True,
        blank=True,
        help_text='Write some promotional copy'
    )

    featured_section_1_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text='Title to display above the promo copy'
    )
    featured_section_1 = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='First featured section for the homepage. Will display up to '
        'three child items.',
        verbose_name='Featured section 1'
    )

    featured_section_2_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text='Title to display above the promo copy'
    )
    featured_section_2 = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Second featured section for the homepage. Will display up to '
        'three child items.',
        verbose_name='Featured section 2'
    )

    featured_section_3_title = models.CharField(
        null=True,
        blank=True,
        max_length=255,
        help_text='Title to display above the promo copy'
    )
    featured_section_3 = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text='Third featured section for the homepage. Will display up to '
        'six child items.',
        verbose_name='Featured section 3'
    )

    api_fields = [
        APIField('name'),
        APIField('subtitle'),
        APIField('introduction'),
        APIField('hero_cta'),
        APIField('hero_cta_link'),
        APIField('body'),
        APIField('featured_section_1'),
        APIField('featured_section_1_title'),
        APIField('image_thumbnail', serializer=ImageRenditionField(
            'fill-200x200', source='image')),
    ]

    content_panels = Page.content_panels + [

        MultiFieldPanel([
            ImageChooserPanel('image'),
            FieldPanel('name'),
            FieldPanel('subtitle'),
            FieldPanel('introduction', classname="full"),
            MultiFieldPanel([
                FieldPanel('hero_cta'),
                PageChooserPanel('hero_cta_link'),
            ])
        ], heading="Hero section"),
        MultiFieldPanel([
            ImageChooserPanel('promo_image'),
            FieldPanel('promo_title'),
            FieldPanel('promo_text'),
        ], heading="Promo section"),
        StreamFieldPanel('body'),
        MultiFieldPanel([
            MultiFieldPanel([
                FieldPanel('featured_section_1_title'),
                PageChooserPanel('featured_section_1'),
            ]),
            MultiFieldPanel([
                FieldPanel('featured_section_2_title'),
                PageChooserPanel('featured_section_2'),
            ]),
            MultiFieldPanel([
                FieldPanel('featured_section_3_title'),
                PageChooserPanel('featured_section_3'),
            ])
        ], heading="Featured homepage sections", classname="collapsible")
    ]

    subpage_types = [
        'pages.StandardPage',
        'portfolio.PortfolioIndexPage',
        'projects.ProjectIndexPage',
        'blog.BlogIndexPage'
    ]
