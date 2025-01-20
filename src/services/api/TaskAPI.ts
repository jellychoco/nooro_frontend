import { Task } from '@/types/task';

class TaskAPI {
    private tasks: Task[] = [];

    async fetchTasks(): Promise<Task[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.tasks), 500);
        });
    }

    async addTask(task: Task): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.tasks.push(task);
                resolve();
            }, 500);
        });
    }

    async updateTask(updatedTask: Task): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.tasks = this.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
                resolve();
            }, 500);
        });
    }

    async deleteTask(id: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.tasks = this.tasks.filter((task) => task.id !== id);
                resolve();
            }, 500);
        });
    }
}

export const taskAPI = new TaskAPI();
