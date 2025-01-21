'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Task } from '@/types/task';
import { taskAPI } from '@/services/api/TaskAPI';
import { Header } from '@/components/Header';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';

const TodoApp: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();

    const loadTasks = async () => {
        const fetchedTasks = await taskAPI.fetchTasks();
        setTasks(fetchedTasks);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = async (title: string, color: string) => {
        const newTask: Task = {
            id: Math.random().toString(36).substring(2, 9),
            title,
            completed: false,
            color,
        };
        await taskAPI.addTask(newTask);
        await loadTasks();
    };

    const toggleTask = async (id: string) => {
        const taskToToggle = tasks.find((task) => task.id === id);
        if (taskToToggle) {
            const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };
            await taskAPI.updateTask(updatedTask);
            await loadTasks();
        }
    };

    const deleteTask = async (id: string) => {
        await taskAPI.deleteTask(id);
        await loadTasks();
    };

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
                                      await taskAPI.updateTask(updatedTask);
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

                <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={(task) => {
                        setEditingTask(task);
                        setIsFormVisible(true);
                    }}
                />
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
