const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`bg-${i}`}
                        className="absolute rounded-full bg-primary"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.2 + 0.1,
                            animation: `float ${Math.random() * 10 + 10}s infinite ${Math.random() * 5}s ease-in-out alternate`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-md text-center relative z-10">
                <div className="grid grid-cols-3 gap-4 mb-10 transform rotate-3">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-xl transition-all duration-700 ease-in-out 
                                ${i % 2 === 0 ?
                                    'bg-primary/20 hover:bg-primary/30 animate-pulse' :
                                    'bg-secondary/20 hover:bg-secondary/30'
                                } ${i === 4 ? 'scale-110' : ''}
                                hover:scale-105 hover:shadow-lg`}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-base-content/70 text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-8 flex justify-center space-x-2">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={`dot-${i}`}
                            className="w-3 h-3 rounded-full bg-primary opacity-50"
                            style={{
                                animation: `pulse 2s infinite ${i * 0.3}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                    100% { transform: translateY(0) rotate(0deg); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default AuthImagePattern;