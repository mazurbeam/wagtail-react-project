from .base import *

DEBUG = False

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "assets"),
    # os.path.join(BASE_DIR, "assets", "bundles"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}

# STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

# WHITENOISE_ROOT = os.path.join(BASE_DIR, 'assets', 'root')

try:
    from .local import *
except ImportError:
    pass
