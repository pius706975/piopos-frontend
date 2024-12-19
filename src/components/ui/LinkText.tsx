import Link from 'next/link';
import React from 'react';

interface LinkTextProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    rel?: string;
}

const LinkText: React.FC<LinkTextProps> = ({
    href,
    children,
    className = '',
    target = '_self',
    rel = 'noopener noreferrer',
}) => {
    return (
        <a
            href={href}
            className={`text-white hover:text-cyan-300 ${className}`}
            style={{ textDecoration: 'none' }}
            target={target}
            rel={target === '_blank' ? rel : undefined}>
            {children}
        </a>
    );
};

export default LinkText;
