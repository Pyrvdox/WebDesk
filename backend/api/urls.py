from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path("token/refresh/",TokenRefreshView.as_view(), name='token-refresh'),
    path('user/',UserInfoAPIView.as_view(), name='user'),
    path('notes/',NotesAPIView.as_view(), name='notes'),
    path('note/<str:username>/<int:id>/',SingleNoteAPIView.as_view(), name='note'),
    path('calculator/',CalculatorAPIView.as_view(), name='calculator'),
    path('mybudget/', BudgetAPIView.as_view(), name='mybudget'),

]
