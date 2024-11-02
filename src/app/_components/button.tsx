import React from 'react'
import { cn } from '~/lib/utils'



export function ButtonGroup({ children }: { children: React.ReactNode[] }) {
    return (
        <div className='rounded-full border border-outline flex items-center overflow-clip'>
            {children.map((child, index) => (
                <div className='cursor-pointer px-6 py-3 border-[.5px] bg-primary-text bg-opacity-[.03] hover:bg-opacity-5 duration-100' key={index}>
                    {child}
                </div>
            ))}
        </div>
    )
}
export function Button({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <button className={cn('cursor-pointer px-6 py-3 bg-blue text-primary-text gap-1 rounded-full flex items-center overflow-clip hover:bg-opacity-80 duration-100 justify-center', className)}>
            {children}
        </button>
    )
}