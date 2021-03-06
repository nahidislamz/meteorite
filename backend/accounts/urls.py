from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),name='blacklist'),
    path('protected/',Protected.as_view(),name='protected'),
    path("author/", UserProfileView.as_view(), name="author"),
   
]