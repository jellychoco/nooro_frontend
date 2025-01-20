'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

// Types
interface Task {
    id: string;
    title: string;
    completed: boolean;
    color: string;
}

// Color options for tasks
const colorOptions = {
    red: '#FF6B6B',
    orange: '#FFA94D',
    yellow: '#FFD93D',
    green: '#6BCB77',
    blue: '#4DABF7',
    indigo: '#748FFC',
    violet: '#9775FA',
    pink: '#F06595',
    gray: '#A8A29E',
    darkBackground: '#1C1C1E',
    lightBackground: '#2C2C2E',
};

// Mock API Client
class ApiClient {
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

const apiClient = new ApiClient();

// Header Component
const Header: FC = () => (
    <header className="flex items-center justify-center">
        <Image src="/TodoLogo.png" alt="Todo App" width={226} height={48} />
    </header>
);

// Color Picker Component
interface ColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => (
    <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(colorOptions).map(([key, color]) => (
            <button key={key} className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1C1C1E]' : ''}`} style={{ backgroundColor: color }} onClick={() => onColorSelect(color)} aria-label={`Select color ${color}`} />
        ))}
    </div>
);

// Task Item Component
interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void; // Added onEdit prop
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => (
    <div className={`flex items-center gap-3 p-4 rounded-lg ${colorOptions.lightBackground} mb-2`}>
        <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? `bg-${colorOptions.indigo} border-${colorOptions.indigo}` : 'border-gray-400'}`} onClick={() => onToggle(task.id)}>
            {task.completed && <Image src="/check-complete.png" alt="Completed" width={12} height={12} />}
        </button>
        <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`} style={{ color: task.completed ? undefined : task.color }}>
            {task.title}
        </span>
        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-white transition-colors" aria-label="Edit task">
            Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-white transition-colors" aria-label="Delete task">
            <Image src="/trash.png" alt="Delete task" width={20} height={20} />
        </button>
    </div>
);

// Task Form Component
interface TaskFormProps {
    onClose: () => void;
    onSubmit: (title: string, color: string) => void;
    initialTask?: Task; // Added initialTask prop for editing
}

const TaskForm: FC<TaskFormProps> = ({ onClose, onSubmit, initialTask }) => {
    const [title, setTitle] = useState(initialTask ? initialTask.title : '');
    const [color, setColor] = useState(initialTask ? initialTask.color : Object.values(colorOptions)[0]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            await onSubmit(title.trim(), color);
            setTitle('');
            setColor(Object.values(colorOptions)[0]);
            onClose();
        }
    };

    return (
        <div className="min-h-screen bg-[#1C1C1E] p-4 sm:p-6">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Image src="/back-arrow.png" alt="back" width={24} height={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                            Title
                        </label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#2C2C2E] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4A72FF]" placeholder="Ex. Brush your teeth" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Color</label>
                        <ColorPicker selectedColor={color} onColorSelect={setColor} />
                    </div>
                    <button type="submit" className="w-full bg-[#4A72FF] text-white py-3 rounded-lg hover:bg-[#3A5FFF] transition-colors flex items-center justify-center gap-2">
                        <Image src="/save.png" alt="Save" width={20} height={20} />
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

// Main App Component
const TodoApp: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();

    const loadTasks = async () => {
        const fetchedTasks = await apiClient.fetchTasks();
        setTasks(fetchedTasks);
    };

    const addTask = async (title: string, color: string) => {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            completed: false,
            color,
        };
        await apiClient.addTask(newTask);
        await loadTasks();
    };

    const toggleTask = async (id: string) => {
        const taskToToggle = tasks.find((task) => task.id === id);
        if (taskToToggle) {
            const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
            await apiClient.updateTask(updatedTask);
            await loadTasks();
        }
    };

    const deleteTask = async (id: string) => {
        await apiClient.deleteTask(id);
        await loadTasks();
    };

    const completedCount = tasks.filter((task) => task.completed).length;

    const renderContent = () => {
        if (isFormVisible) {
            return (
                <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
                    <TaskForm
                        onClose={() => {
                            setIsFormVisible(false);
                            setEditingTask(undefined);
                        }}
                        onSubmit={
                            editingTask
                                ? async (title, color) => {
                                      const updatedTask = { ...editingTask, title, color };
                                      await apiClient.updateTask(updatedTask);
                                      setEditingTask(undefined);
                                      setIsFormVisible(false);
                                      await loadTasks();
                                  }
                                : addTask
                        }
                        initialTask={editingTask}
                    />
                </div>
            );
        }

        return (
            <>
                <div className="w-full px-4 sm:px-6 max-w-3xl mx-auto">
                    <button
                        onClick={() => {
                            setEditingTask(undefined);
                            setIsFormVisible(true);
                        }}
                        className="w-full bg-[#4A72FF] text-white py-3 rounded-lg hover:bg-[#3A5FFF] transition-colors flex items-center justify-center gap-2"
                    >
                        Create Task
                        <Image src="/plus.png" alt="Create Task" width={20} height={20} />
                    </button>
                </div>

                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Tasks ({tasks.length})</h2>
                        <span className="text-sm text-gray-400">Completed {completedCount}</span>
                    </div>

                    {tasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="mb-4 flex justify-center">
                                <Image src="/Clipboard.png" alt="clipboard" width={56} height={56} priority className="dark:invert" />
                            </div>
                            <p className="text-gray-500 text-center">You don&apos;t have any tasks registered yet.</p>
                            <p className="text-gray-600 text-center">Create tasks and organize your to-do items.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onDelete={deleteTask}
                                    onEdit={(t) => {
                                        setEditingTask(t);
                                        setIsFormVisible(true);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{
                background: 'linear-gradient(to bottom, #1C1C1E 20%, #2C2C2E 20%)',
            }}
        >
            <div className="h-[20vh] flex flex-col items-center justify-start pt-8">
                <Header />
            </div>
            {renderContent()}
        </div>
    );
};

export default TodoApp;
