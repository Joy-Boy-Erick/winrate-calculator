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

const LuckyCharmIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 2H8C6.9 2 6 2.9 6 4v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        <path d="M12 4.5c-1.38 0-2.5 1.12-2.5 2.5 0 .58.2 1.12.53 1.55l1.97 2.45 1.97-2.45c.33-.43.53-.97.53-1.55 0-1.38-1.12-2.5-2.5-2.5z" opacity="0.3"/>
    </svg>
);

const CrescentMoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.09 15.31c-3.13-.5-5.55-3.15-5.55-6.31 0-3.47 2.83-6.3 6.3-6.3.88 0 1.71.18 2.47.51-2.9.89-5.07 3.54-5.07 6.69 0 1.3.35 2.52.95 3.61z"/>
        <path d="M18.5 10.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-2 2c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5z" opacity="0.6"/>
    </svg>
);

const CherryBlossomIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 12.31c-.52.26-1.1.39-1.7.39-1.4 0-2.65-.81-3.24-2.03-.59 1.22-1.84 2.03-3.24 2.03-.6 0-1.18-.13-1.7-.39C4.81 13.56 4 12.35 4 11c0-1.65 1.35-3 3-3 .75 0 1.41.28 1.93.74.52-.46 1.18-.74 1.93-.74s1.41.28 1.93.74c.52-.46 1.18-.74 1.93-.74 1.65 0 3 1.35 3 3 0 1.35-.81 2.56-2.24 3.31zM12 15c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
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

        // 2. Start character celebration slightly after the pulse begins for a more pronounced "reaction" feel.
        setTimeout(() => {
            setIsCelebrating(true);
            setTimeout(() => {
                setIsCelebrating(false);
            }, 500); // The duration of the celebration animation.
        }, 150); 
    };

    const resultAnimationClasses: Record<AnimationStyle, string> = {
        Slide: 'animate-slide-in-up',
        Bounce: 'animate-bounce-in',
        Sparkle: 'animate-sparkle-in',
    };
    const resultAnimationClass = resultAnimationClasses[animationStyle];
    
    const appStyle = {
      backgroundImage: "url('https://i.imgur.com/Y1u4jG8.jpg')",
    };

    return (
        <div 
          className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-fixed"
          style={appStyle}
        >
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
                                icon={<LuckyCharmIcon className="w-6 h-6" />}
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
                                icon={<CrescentMoonIcon className="w-5 h-5" />}
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
                                icon={<CherryBlossomIcon className="w-6 h-6" />}
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
