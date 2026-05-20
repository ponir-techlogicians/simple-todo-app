# Simple Todo App — Backend

Django REST API for the Simple Todo App.

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/todos/ | List all todos |
| POST | /api/todos/ | Create a todo |
| GET | /api/todos/{id}/ | Retrieve a todo |
| PATCH | /api/todos/{id}/ | Update a todo |
| DELETE | /api/todos/{id}/ | Delete a todo |

## Running Tests

```bash
python manage.py test todos
```
