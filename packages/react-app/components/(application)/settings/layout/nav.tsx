"use client";

import type {HTMLAttributes} from 'react'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Gift, PartyPopper } from 'lucide-react';

export type NavProps = HTMLAttributes<HTMLDivElement>;

export const Nav = ({className, ...props}: NavProps) => {
    const pathname = usePathname();

    return (
        <div className={className} {...props}>
            
            <Link
                href="/account/points"
                className={pathname === '/account/points' ? 'font-bold' : ''}
            >
                Points
            </Link>
            <Link
                href="/account/redeem"
                className={pathname === '/account/redeem' ? 'font-bold' : ''}
            >
                Redeem
            </Link>
        </div>
    );
    
}