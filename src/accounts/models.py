from django.db import models
from django.contrib.auth.models import User
from PIL import Image


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='profile_pics/profile.jpg',
                              upload_to='profile_pics', null=True, blank=True)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)




class Customer(models.Model):
    fname = models.CharField(max_length=40)
    lname = models.CharField(max_length=20)
    gmail = models.EmailField(max_length=20)
    phone= models.IntegerField(max_length=13)
    address= models.TextField(max_length=30)
    
    def __str__(self):
        return self.fname
