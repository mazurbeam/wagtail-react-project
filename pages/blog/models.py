from django.db import models

from modelcluster.fields import ParentalKey
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase

from wagtail.models import Page, Orderable
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel, InlinePanel
from wagtail.search import index

from pages.blocks import BaseStreamBlock


class BlogPageTag(TaggedItemBase):
	content_object = ParentalKey('blog.BlogPage', on_delete=models.CASCADE, related_name='tagged_items')


class BlogIndexPage(Page):
	intro = RichTextField(blank=True)
	icon = models.CharField(max_length=20)

	api_fields = [
		APIField('intro'),
		APIField('icon'),
	]
	content_panels = Page.content_panels + [
		FieldPanel('intro', classname="full"),
		FieldPanel('icon'),

	]


class BlogPage(Page):
	date = models.DateField("Post date")
	icon = models.CharField(max_length=20)
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
		APIField('icon'),
		APIField('intro'),
		APIField('body'),
		APIField('tags'),
		APIField('gallery_images')
	]

	content_panels = Page.content_panels + [
		FieldPanel('date'),
		FieldPanel('icon'),
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

	api_fields = [
		APIField('image'),
		APIField('caption'),
		APIField('page'),
		APIField('image_thumbnail', serializer=ImageRenditionField('fill-100x100', source='image')),
		APIField('image_medium', serializer=ImageRenditionField('fill-300x300', source='image'))
	]

	panels = [
		ImageChooserPanel('image'),
		FieldPanel('caption'),
	]
