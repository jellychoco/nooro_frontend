import { FC } from 'react';
import { colorOptions } from '@/constants/colors';

interface ColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => (
    <div className="flex flex-wrap gap-2 mb-4 ">
        {Object.values(colorOptions).map((color) => (
            <button key={color} className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1C1C1E]' : ''}`} style={{ backgroundColor: color }} onClick={() => onColorSelect(color)} aria-label={`Select color ${color}`} />
        ))}
    </div>
);
