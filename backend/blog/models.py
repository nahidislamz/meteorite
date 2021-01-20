from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.Model):

    category = models.CharField(max_length=50)

    def __str__(self):
        return self.category

class Tag(models.Model):

    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category = models.ManyToManyField(Categories, null=True, blank=True)
    tags = models.ManyToManyField(Tag, null=True, blank=True)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        main_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=main_slug).count()

        count = 1
        slug = main_slug
        while(queryset):
            slug = main_slug + '-' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title