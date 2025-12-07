# backend/deployment.py
import os
from .settings import *
from pathlib import Path
from datetime import timedelta
from decouple import config
from environs import Env

# ------------------------------
# SECURITY SETTINGS
# ------------------------------
DEBUG = False
ALLOWED_HOSTS = ["yourdomain.com", "www.yourdomain.com"]

SECRET_KEY = env("SECRET_KEY")  # load from .env
STRIPE_PUBLIC_KEY = env("STRIPE_PUBLIC_KEY")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")

# ------------------------------
# EMAIL SETTINGS
# ------------------------------
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'yk05701@gmail.com'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = 'yk05701@gmail.com'

# ------------------------------
# DATABASE SETTINGS (Postgres example)
# ------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASSWORD"),
        'HOST': env("DB_HOST"),
        'PORT': env("DB_PORT"),
    }
}

# ------------------------------
# SECURITY & HTTPS SETTINGS
# ------------------------------
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

# ------------------------------
# DEMO ACCOUNT BYPASS OTP
# ------------------------------
# Emails of demo accounts
DEMO_EMAILS = ["demo_user@example.com", "demo_vendor@example.com"]

# Add a helper function to check demo user in your registration view
# Example usage in RegisterView.perform_create():
# if user.email in DEMO_EMAILS:
#     user.is_verified = True
#     user.save()

# ------------------------------
# CORS / CSRF PRODUCTION
# ------------------------------
CORS_ALLOWED_ORIGINS = [
    "https://yourfrontenddomain.com",
]

CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = [
    "https://yourfrontenddomain.com",
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_EXPOSE_HEADERS = ['Set-Cookie']
