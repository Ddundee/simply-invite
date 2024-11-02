import React from 'react'

type Props = {
    children: React.ReactNode,
    title: string
}

function Card({ children, title }: Props) {
    return (
        <div className='rounded-lg border border-outline p-8 bg-primary-text bg-opacity-[.03]'>
            <h4 className='mb-3'>{title}</h4>
            {children}
        </div>
    )
}

export default Card