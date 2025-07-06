import React from 'react';

interface CardProps {
    number: number;
    onClick?: () => void;
    isPlayed?: boolean;
    by?: string;
    small?: boolean;
}

const Card = ({number, onClick, isPlayed = false, by, small = false}: CardProps) => {
    const baseClasses = "rounded-lg shadow-md relative flex flex-col justify-center items-center p-2 text-center";
    let sizeClasses;
    if (small) {
        sizeClasses = "w-12 h-18";
    } else {
        sizeClasses = "w-24 h-36";
    }

    const playableClasses = "bg-white dark:bg-slate-600 border-2 border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-slate-500 transition-all transform hover:-translate-y-2";

    const playedClasses = "bg-slate-300 dark:bg-slate-700 border-2 border-slate-400 dark:border-slate-600 text-slate-800 dark:text-slate-300";

    return (
        <div
            className={`${baseClasses} ${isPlayed ? playedClasses : playableClasses} ${sizeClasses}`}
            onClick={!isPlayed ? onClick : undefined}
        >
            <div className={`${small? 'text-2xl' : 'text-5xl'} font-bold`}>
                {number}
            </div>

            {isPlayed && by && (
                <div className="absolute bottom-2 left-0 right-0 px-1 w-full">
                    <p className="truncate text-xs text-slate-600 dark:text-slate-400 font-mono">{by}</p>
                </div>
            )}
        </div>
    );
};

export default Card;
