#### Wagtail - React Starter Template
This project uses Django-based [Wagtail](http://docs.wagtail.io/) CMS for the backend with a React fronted and Redux store that connects to its [page API](http://docs.wagtail.io/en/v2.2.2/advanced_topics/api/index.html). 

To download and run with the dev server:

```
git clone https://github.com/mazurbeam/wagtail-react-project.git
cd wagtail-react-project

// make your python virtualenv
virtualenv -p python3 ~/.virtualenvs/wagtail-react-project
source ~/.virtualenvs/wagtail-react-project/bin/activate
```

with virtualenv activated and inside the project directory
```
./manage.py migrate
./manage.py createsuperuser
./manage.py runserver
```

in another terminal starting in the project directory:
```
cd frontend
yarn install
yarn run
```

You'll get the standard message to view at localhost:3000 but it will be accessible from Django at localhost:8000 with hot swapping enabled.


