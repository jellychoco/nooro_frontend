import { FC } from 'react';
import Image from 'next/image';
import { Task } from '@/types/task';
import { backgroundColors } from '@/constants/colors';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            await onDelete(task.id);
        }
    };

    return (
        <div className={`flex items-center gap-3 p-4 rounded-lg bg-[${backgroundColors.light}] mb-2`}>
            <button className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-[#748FFC] border-[#748FFC]' : 'border-gray-400'}`} onClick={() => onToggle(task.id)}>
                {task.completed && <Image src="/check.png" alt="Completed" width={12} height={12} />}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`} style={{ color: task.completed ? undefined : task.color }}>
                {task.title}
            </span>
            <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-white transition-colors" aria-label="Edit task">
                edit
            </button>
            <button onClick={handleDelete} className="text-gray-400 hover:text-white transition-colors" aria-label="Delete task">
                <Image src="/trash.png" alt="Delete" width={20} height={20} />
            </button>
        </div>
    );
};
