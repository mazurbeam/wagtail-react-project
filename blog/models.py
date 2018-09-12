from django.db import models

from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField, StreamField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, StreamFieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.api import APIField

from pages.blocks import BaseStreamBlock


class BlogPageTag(TaggedItemBase):
	content_object = ParentalKey('blog.BlogPage', on_delete=models.CASCADE, related_name='tagged_items')


class BlogIndexPage(Page):
	intro = RichTextField(blank=True)

	api_fields = [
		APIField('intro'),
	]
	content_panels = Page.content_panels + [
		FieldPanel('intro', classname="full")
	]


class BlogPage(Page):
	date = models.DateField("Post date")
	intro = models.CharField(max_length=250)
	body = StreamField(
		BaseStreamBlock(), verbose_name="Page body", blank=True
	)
	tags = ClusterTaggableManager(through=BlogPageTag, blank=True)

	def main_image(self):
		gallery_item = self.gallery_images.first()
		if gallery_item:
			return gallery_item.image
		else:
			return None

	search_fields = Page.search_fields + [
		index.SearchField('intro'),
		index.SearchField('body'),
	]

	api_fields = [
		APIField('date'),
		APIField('intro'),
		APIField('body'),
		APIField('tags'),
	]

	content_panels = Page.content_panels + [
		FieldPanel('date'),
		FieldPanel('intro'),
		StreamFieldPanel('body', classname="full"),
		InlinePanel('gallery_images', label="Gallery images"),
		FieldPanel('tags'),
	]


class BlogPageGalleryImage(Orderable):
	page = ParentalKey(BlogPage, on_delete=models.CASCADE, related_name='gallery_images')
	image = models.ForeignKey(
		'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
	)
	caption = models.CharField(blank=True, max_length=250)

	panels = [
		ImageChooserPanel('image'),
		FieldPanel('caption'),
	]
