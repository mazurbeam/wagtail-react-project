from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
CORS_ORIGIN_ALLOW_ALL = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-wb=1_g0uaf!+l_^9&f4#aoorocrd5_gcm&y6*ni4za9iw4n7$9"

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


try:
    from .local import *
except ImportError:
    pass
