// import type { CreateTaskInput, Task, UpdateTaskInput } from '@/types/task';

// export class TaskAPI {
//     private static BASE_URL = '/api/tasks';

//     static async getTasks(): Promise<Task[]> {
//         const response = await fetch(this.BASE_URL);
//         if (!response.ok) throw new Error('Failed to fetch tasks');
//         return response.json();
//     }

//     static async getTask(id: string): Promise<Task> {
//         const response = await fetch(`${this.BASE_URL}/${id}`);
//         if (!response.ok) throw new Error('Failed to fetch task');
//         return response.json();
//     }

//     static async createTask(input: CreateTaskInput): Promise<Task> {
//         const response = await fetch(this.BASE_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(input),
//         });
//         if (!response.ok) throw new Error('Failed to create task');
//         return response.json();
//     }

//     static async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
//         const response = await fetch(`${this.BASE_URL}/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(input),
//         });
//         if (!response.ok) throw new Error('Failed to update task');
//         return response.json();
//     }

//     static async deleteTask(id: string): Promise<void> {
//         const response = await fetch(`${this.BASE_URL}/${id}`, {
//             method: 'DELETE',
//         });
//         if (!response.ok) throw new Error('Failed to delete task');
//     }
// }
