from django.urls import path
from .views import signup_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),    # 👈 For login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   # 👈 For token refresh 
]
