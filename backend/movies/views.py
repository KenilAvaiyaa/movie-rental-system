import json
import os
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .serializers import UserSignupSerializer

@api_view(['POST'])
def signup_view(request):
    serializer = UserSignupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def movie_list_view(request):
    movies_file_path = os.path.join(settings.BASE_DIR, 'movies', 'movies.json')
    with open(movies_file_path, 'r') as file:
        movies_data = json.load(file)
    return Response(movies_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rent_movie_view(request):
    imdb_id = request.data.get('imdbID')
    if not imdb_id:
        return Response({'error': 'imdbID is required'}, status=400)

    movies_file_path = os.path.join(settings.BASE_DIR, 'movies', 'movies.json')
    with open(movies_file_path, 'r') as file:
        movies_data = json.load(file)

    for movie in movies_data:
        if movie['imdbID'] == imdb_id:
            if movie.get('rented'):
                return Response({'error': 'Movie is already rented'}, status=400)
            movie['rented'] = True
            movie['rented_by'] = request.user.username

            with open(movies_file_path, 'w') as file:
                json.dump(movies_data, file, indent=4)

            return Response({'message': 'Movie rented successfully'})

    return Response({'error': 'Movie not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def return_movie_view(request):
    imdb_id = request.data.get('imdbID')
    if not imdb_id:
        return Response({'error': 'imdbID is required'}, status=400)

    movies_file_path = os.path.join(settings.BASE_DIR, 'movies', 'movies.json')
    with open(movies_file_path, 'r') as file:
        movies_data = json.load(file)

    for movie in movies_data:
        if movie['imdbID'] == imdb_id:
            if not movie.get('rented', False):
                return Response({'error': 'Movie is not rented'}, status=400)
            if movie.get('rented_by') != request.user.username:
                return Response({'error': 'You cannot return a movie you did not rent'}, status=403)
            
            movie['rented'] = False
            movie['rented_by'] = None

            with open(movies_file_path, 'w') as file:
                json.dump(movies_data, file, indent=4)

            return Response({'message': 'Movie returned successfully'})

    return Response({'error': 'Movie not found'}, status=404)
