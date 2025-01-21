import { Task } from '@/types/task';

interface TaskResponse {
    id: number;
    title: string;
    completed: boolean;
    color: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

class TaskAPI {
    async fetchTasks(): Promise<Task[]> {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = (await response.json()) as TaskResponse[];
        return tasks.map((task) => ({
            ...task,
            id: task.id.toString(),
        }));
    }

    async addTask(task: Task): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        const newTask = await response.json();
        return {
            ...newTask,
            id: newTask.id.toString(),
        };
    }

    async updateTask(task: Task): Promise<Task> {
        const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const updatedTask = await response.json();
        return {
            ...updatedTask,
            id: updatedTask.id.toString(),
        };
    }

    async deleteTask(id: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    }
}

export const taskAPI = new TaskAPI();
