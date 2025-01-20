import { FC } from 'react';
import Image from 'next/image';

export const EmptyState: FC = () => (
    <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 flex justify-center">
            <Image src="/Clipboard.png" alt="clipboard" width={56} height={56} priority className="dark:invert" />
        </div>
        <p className="text-gray-500 text-center">You don&apos;t have any tasks registered yet.</p>
        <p className="text-gray-600 text-center">Create tasks and organize your to-do items.</p>
    </div>
);
