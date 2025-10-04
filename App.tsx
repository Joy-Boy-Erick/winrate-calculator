import React, { useState, useEffect, useRef } from 'react';
import { useWinRateCalculator } from './hooks/useWinRateCalculator';

const animationStyles = ['Slide', 'Bounce', 'Sparkle'] as const;
type AnimationStyle = typeof animationStyles[number];

// Helper hook to track the previous value of a state or prop
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const SwordsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="20" y1="4" x2="4" y2="20"></line>
        <line x1="14.5" y1="3.5" x2="20.5" y2="9.5"></line>
        <line x1="4" y1="20" x2="10" y2="14"></line>
        <line x1="20" y1="20" x2="4" y2="4"></line>
        <line x1="20.5" y1="14.5" x2="14.5" y2="20.5"></line>
        <line x1="10" y1="10" x2="4" y2="4"></line>
    </svg>
);

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V13H5V6.3l7-3.11v9.8z" />
    </svg>
);

const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
    </svg>
);

const FlameIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 3 10.64 3 14.26 3 18.28 6.5 22 11.08 22c4.32 0 8.04-3.8 8.04-8.52 0-3.7-2.08-6.81-5.12-8.07l-.02-.02z"/>
    </svg>
);

const KaguraCharacter: React.FC<{ isCelebrating: boolean; isReacting: boolean; }> = ({ isCelebrating, isReacting }) => {
    // This logic ensures celebration and reaction animations take precedence over the subtle idle float.
    const getAnimationClass = () => {
        if (isCelebrating) {
            return 'animate-nana-celebrate'; // Re-using generic celebration animation
        }
        if (isReacting) {
            return 'animate-nana-nod'; // Re-using generic nod animation
        }
        return 'animate-idle-float'; // Default to the subtle idle animation
    };

    const animationClass = getAnimationClass();

    return (
        <div className="hidden lg:block w-72 h-72 relative">
          <img 
            src="https://i.imgur.com/sY8b5L6.png" 
            alt="Cute Chibi Kagura from Mobile Legends." 
            className={`w-full h-full object-contain drop-shadow-2xl ${animationClass}`}
          />
        </div>
    );
};


interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    animationStyle: AnimationStyle;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, icon, 'aria-describedby': ariaDescribedBy, 'aria-invalid': ariaInvalid, animationStyle }) => {
    const focusContainerClasses: Record<AnimationStyle, string> = {
        Slide: 'focus-within:scale-105',
        Bounce: 'focus-within:scale-[1.07]',
        Sparkle: 'focus-within:scale-105',
    };
    
    const focusInputShadowClasses: Record<AnimationStyle, string> = {
        Slide: 'focus:shadow-[0_0_20px_rgba(129,140,248,0.8)]', // Kagura's indigo
        Bounce: 'focus:shadow-[0_0_25px_rgba(168,85,247,0.9)]',
        Sparkle: 'focus:shadow-[0_0_30px_rgba(253,224,71,0.8)]',
    };

    return (
        <div className={`relative group transition-transform duration-500 ease-out ${focusContainerClasses[animationStyle]}`}>
            <label 
                htmlFor={id} 
                className="block text-sm font-bold text-gray-100 mb-2 ml-4 tracking-wider transition-colors duration-500 ease-out group-focus-within:text-pink-300"
            >
                {label}
            </label>
            <div className="absolute inset-y-0 left-0 top-7 flex items-center pl-4 pointer-events-none text-indigo-200 transition-colors duration-500 ease-out group-focus-within:text-pink-300">
                {icon}
            </div>
            <input
                type="number"
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-full text-white placeholder-gray-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-500 ease-out ${focusInputShadowClasses[animationStyle]}`}
                min="0"
                required
                aria-required="true"
                aria-describedby={ariaDescribedBy}
                aria-invalid={ariaInvalid}
            />
        </div>
    );
};

interface AnimationStyleSelectorProps {
    currentStyle: AnimationStyle;
    setStyle: (style: AnimationStyle) => void;
}

const AnimationStyleSelector: React.FC<AnimationStyleSelectorProps> = ({ currentStyle, setStyle }) => (
    <div className="text-center mb-6">
        <label className="text-sm font-bold text-gray-100 mb-2 block tracking-wider">Animation Style</label>
        <div className="inline-flex rounded-full bg-black/20 p-1 space-x-1">
            {animationStyles.map(style => (
                <button
                    key={style}
                    onClick={() => setStyle(style)}
                    className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        currentStyle === style
                            ? 'bg-indigo-500 text-white shadow-md'
                            : 'text-indigo-100 hover:bg-white/10'
                    }`}
                    aria-pressed={currentStyle === style}
                >
                    {style}
                </button>
            ))}
        </div>
    </div>
);

const WinStreakTracker: React.FC<{ streak: number; onAddWin: () => void; onReset: () => void; isPulsing: boolean; }> = ({ streak, onAddWin, onReset, isPulsing }) => (
    <div className="mt-4 p-6 bg-black/20 rounded-2xl border border-white/20 text-center">
        <h3 className="text-lg font-bold text-indigo-100 tracking-wider">Current Win Streak</h3>
        <div className="flex items-center justify-center gap-2 my-2">
            <FlameIcon className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
            <p className={`font-black text-7xl text-white drop-shadow-lg ${isPulsing ? 'animate-pulse-streak' : ''}`}>{streak}</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
            <button
                type="button"
                onClick={onReset}
                aria-label="Reset win streak"
                className="w-full font-bold py-2 px-4 bg-indigo-900/50 text-indigo-100 rounded-full hover:bg-indigo-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-900/50 focus:ring-white/50 transition-all duration-300"
            >
                RESET STREAK
            </button>
            <button
                type="button"
                onClick={onAddWin}
                aria-label="Add one win to the streak"
                className="w-full font-bold py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-900/50 focus:ring-emerald-400 transition-all duration-300 transform shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.8)]"
            >
                ADD WIN
            </button>
        </div>
    </div>
);


export default function App() {
    const {
        totalMatches,
        setTotalMatches,
        currentWinRate,
        setCurrentWinRate,
        targetWinRate,
        setTargetWinRate,
        result,
        error,
        calculate,
        reset,
        winStreak,
        incrementStreak,
        resetStreak,
    } = useWinRateCalculator();

    const [animationStyle, setAnimationStyle] = useState<AnimationStyle>(
        () => (localStorage.getItem('animationStyle') as AnimationStyle) || 'Slide'
    );
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [isPulsingStreak, setIsPulsingStreak] = useState(false);
    const [isReacting, setIsReacting] = useState(false);
    const prevWinStreak = usePrevious(winStreak);

    useEffect(() => {
        localStorage.setItem('animationStyle', animationStyle);
    }, [animationStyle]);

    useEffect(() => {
        // Trigger a subtle reaction when the streak number changes for any reason.
        if (typeof prevWinStreak === 'number' && winStreak !== prevWinStreak) {
            setIsReacting(true);
            setTimeout(() => setIsReacting(false), 400); // Duration of the nod animation
        }
    }, [winStreak, prevWinStreak]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        calculate();
    };

    const handleAddWin = () => {
        incrementStreak();

        // 1. Animate the win streak number first for immediate, impactful feedback.
        setIsPulsingStreak(true);
        setTimeout(() => {
            setIsPulsingStreak(false);
        }, 400); // The duration of the 'pulse-streak' animation.

        // 2. Start character celebration animation slightly after the number pulse begins.
        setTimeout(() => {
            setIsCelebrating(true);
            setTimeout(() => {
                setIsCelebrating(false);
            }, 500); // The duration of the celebration animation.
        }, 100); 
    };

    const resultAnimationClasses: Record<AnimationStyle, string> = {
        Slide: 'animate-slide-in-up',
        Bounce: 'animate-bounce-in',
        Sparkle: 'animate-sparkle-in',
    };
    const resultAnimationClass = resultAnimationClasses[animationStyle];

    return (
        <div className="min-h-screen bg-black/20 flex items-center justify-center p-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <KaguraCharacter isCelebrating={isCelebrating} isReacting={isReacting} />
                <div className="w-full max-w-md bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-500/20 border border-white/20 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-black text-white tracking-wide">Win Rate <span className="text-pink-300">Seimei</span></h1>
                            <p className="text-indigo-200 mt-2">Mobile Legends Victory Calculator</p>
                        </div>

                        <AnimationStyleSelector currentStyle={animationStyle} setStyle={setAnimationStyle} />

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                id="totalMatches"
                                label="Total Matches"
                                value={totalMatches}
                                onChange={(e) => setTotalMatches(e.target.value)}
                                placeholder="e.g., 1500"
                                icon={<SwordsIcon className="w-5 h-5" />}
                                aria-describedby={error ? "error-message-alert" : undefined}
                                aria-invalid={!!error}
                                animationStyle={animationStyle}
                            />

                            <InputField
                                id="currentWinRate"
                                label="Current Win Rate (%)"
                                value={currentWinRate}
                                onChange={(e) => setCurrentWinRate(e.target.value)}
                                placeholder="e.g., 55.5"
                                icon={<ShieldIcon className="w-5 h-5" />}
                                aria-describedby={error ? "error-message-alert" : undefined}
                                aria-invalid={!!error}
                                animationStyle={animationStyle}
                            />
                            
                            <InputField
                                id="targetWinRate"
                                label="Target Win Rate (%)"
                                value={targetWinRate}
                                onChange={(e) => setTargetWinRate(e.target.value)}
                                placeholder="e.g., 60"
                                icon={<TargetIcon className="w-5 h-5" />}
                                aria-describedby={error ? "error-message-alert" : undefined}
                                aria-invalid={!!error}
                                animationStyle={animationStyle}
                            />

                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={reset}
                                    aria-label="Reset all input fields"
                                    className="w-full font-bold py-3 px-4 bg-indigo-900/50 text-indigo-100 rounded-full hover:bg-indigo-900/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-900/50 focus:ring-white/50 transition-all duration-300"
                                >
                                    RESET
                                </button>
                                <button
                                    type="submit"
                                    aria-label="Calculate wins needed"
                                    className="w-full font-bold py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-900/50 focus:ring-indigo-400 transition-all duration-300 transform shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:shadow-[0_0_35px_rgba(129,140,248,0.8)]"
                                >
                                    CALCULATE
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="px-8 pb-4">
                        <WinStreakTracker 
                            streak={winStreak} 
                            onAddWin={handleAddWin} 
                            onReset={resetStreak} 
                            isPulsing={isPulsingStreak}
                        />
                    </div>

                    {(result !== null || error) && (
                        <div className="transition-all duration-500 ease-in-out">
                             {error && (
                                <div id="error-message-alert" role="alert" className={`bg-red-800/60 border-t-2 border-red-500 p-6 text-center ${resultAnimationClass}`}>
                                    <p className="font-bold text-white text-lg">Whoopsie!</p>
                                    <p className="text-red-200 mt-1">{error}</p>
                                </div>
                            )}
                            {result !== null && (
                                <div aria-live="polite" className={`bg-gradient-to-t from-purple-900/50 to-transparent border-t-2 border-purple-400 p-8 text-center ${resultAnimationClass}`}>
                                    <p className="text-indigo-100 mb-2">You need this many wins in a row!</p>
                                    <p className="font-black text-6xl text-pink-300 tracking-wider drop-shadow-[0_0_10px_rgba(249,168,212,0.7)]">{result}</p>
                                    <p className="text-indigo-100 mt-2">Go get that victory streak!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}