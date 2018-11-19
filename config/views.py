
# views.py
import requests
import os

from django.conf import settings
from django.shortcuts import render
# from sandwich.models import Sandwich
# from sandwich.serializers import SandwichSerializer
# from user.serializers import UserSerializer
from webpack_loader.utils import get_files
from react.render import render_component


# def homepage(request):
#     try:
#         sandwich = Sandwich.objects.get(id=id)
#         serializer = SandwichSerializer(sandwich)
#         sandwich_data = serializer.data
#     except Sandwich.DoesNotExist:
#         sandwich_data = {}
#     # The magic happens in our _react_render helper function
#     return _react_render({'sandwich': sandwich_data}, request)


def render_main(request):
    main = get_files('main')
    print(main)
    # main_component = render_component(
    #     '/Users/mazurbeam/dev/projects/wagtail-react/wagtail-react-project/assets/bundles/js/main.51c7f8a2.js')
    # rendered = render_component(main[0]['url'])
    # rendered = 'rendered'
    # print(main[0]['path'])
    # print(rendered)
    return render(request, 'index.html')


def _react_render(content, request):
    # Let's grab our user's info if she has any
    if request.user.is_authenticated():
        serializer = UserSerializer(request.user)
        user = serializer.data
    else:
        user = {}

    # Here's what we've got so far
    render_assets = {
        'url': request.path_info,
        'user': user
    }
    # Now we add the sandwich. We use the Dict#update method so that the
    # key could be anything, like pizza or cake or burger.
    render_assets.update(content)

    try:
        # All right, let's send it! Note that we set the content type to json.
        res = requests.post(settings.RENDER_SERVER_BASE_URL + '/render',
                            json=render_assets,
                            headers={'content_type': 'application/json'})
        rendered_payload = res.json()
    except Exception as e:
        ...
    # Beautiful! Let's render this stuff into our base template
    return render(request, 'index.html', rendered_payload)
