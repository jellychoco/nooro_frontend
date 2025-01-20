import Image from 'next/image';
import { FC } from 'react';

export const Header: FC = () => (
    <header className="flex items-center justify-center">
        <Image src="/TodoLogo.png" alt="Todo App" width={226} height={48} />
    </header>
);
