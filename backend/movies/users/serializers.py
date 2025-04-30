from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  # ✅ include extra fields here
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Include username in response body as well (optional)
        data['username'] = self.user.username
        return data
