from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Todo


class TodoModelTest(TestCase):
    def test_create_todo(self):
        todo = Todo.objects.create(title="Buy groceries")
        self.assertEqual(todo.title, "Buy groceries")
        self.assertFalse(todo.completed)
        self.assertIsNotNone(todo.created_at)

    def test_str_representation(self):
        todo = Todo.objects.create(title="Write tests")
        self.assertEqual(str(todo), "Write tests")


class TodoAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo = Todo.objects.create(title="Initial task")

    def test_list_todos(self):
        response = self.client.get("/api/todos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_todo(self):
        payload = {"title": "New task", "completed": False}
        response = self.client.post("/api/todos/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)

    def test_update_todo_completion(self):
        response = self.client.patch(
            f"/api/todos/{self.todo.id}/",
            {"completed": True},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertTrue(self.todo.completed)

    def test_delete_todo(self):
        response = self.client.delete(f"/api/todos/{self.todo.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)
