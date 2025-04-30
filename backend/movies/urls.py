from django.urls import path
from .views import signup_view, movie_list_view, rent_movie_view, return_movie_view, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('signup/', signup_view, name='signup'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),    # 👈 For login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   # 👈 For token refresh 
    path('movies/', movie_list_view, name='movie-list'),    # 👈 For movie list
    path('rent/', rent_movie_view, name='rent-movie'),    # 👈 For renting a movie
    path('return/', return_movie_view, name='return-movie'),    # 👈 For returning a movie
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
