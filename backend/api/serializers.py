from rest_framework import serializers
from .models import CustomUser

#Create serializers here
class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email","password1","password2")
        extra_kwargs = {"password":{"write_only": True}}

        def validate(self, data):
            if data['password1'] != data['password2']:
                raise serializers.ValidationError("Passwords are not the same!")
            
        def create(self, validated_data):
            password = validated_data['password1']

            user = CustomUser(email=validated_data['email'],
                              username=validated_data['username'])
            user.set_password(password)
            user.save()

            return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id","username","email")

