import { FC } from 'react';
import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export const TaskList: FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
    const completedCount = tasks.filter((task) => task.completed).length;

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Tasks ({tasks.length})</h2>
                <span className="text-sm text-gray-400">Completed {completedCount}</span>
            </div>

            {tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
        </div>
    );
};
