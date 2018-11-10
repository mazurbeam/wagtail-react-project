from django.shortcuts import render
from rest_framework import viewsets
from .models import ContactMessage
from .serializers import ContactMessageSerializer

# Create your views here.

class ContactMessageView(viewsets.ModelViewSet):

	queryset = ContactMessage.objects.all()
	serializer_class = ContactMessageSerializer


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
    return render(request, 'base.html', rendered_payload)