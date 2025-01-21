import { FC, useState } from 'react';
import Image from 'next/image';
import { Task } from '@/types/task';
import { colorOptions } from '@/constants/colors';
import { ColorPicker } from './ColorPicker';

interface TaskFormProps {
    onClose: () => void;
    onSubmit: (title: string, color: string) => void;
    initialTask?: Task;
}

export const TaskForm: FC<TaskFormProps> = ({ onClose, onSubmit, initialTask }) => {
    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [color, setColor] = useState(initialTask?.color ?? Object.values(colorOptions)[0]);

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
        <div className="w-full max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <Image src="/back-arrow.png" alt="back" width={24} height={24} />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[#4EA8DE] font-bold mb-2">
                        Title
                    </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-[#2C2C2E] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4A72FF]" placeholder="Ex. Brush your teeth" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 text-[#4EA8DE] font-bold mb-2">Color</label>
                    <ColorPicker selectedColor={color} onColorSelect={setColor} />
                </div>
                <button type="submit" className="w-full bg-[#4A72FF] text-white py-3 rounded-lg hover:bg-[#3A5FFF] transition-colors flex items-center justify-center gap-2 font-bold">
                    {initialTask ? 'Save' : 'Add Task'}
                    <Image src={initialTask ? '/check-complete.png' : '/plus.png'} alt={initialTask ? 'Save' : 'Add Task'} width={20} height={20} />
                </button>
            </form>
        </div>
    );
};
