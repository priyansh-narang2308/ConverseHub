import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-base-100 to-base-200/50">
            <div className="max-w-md text-center space-y-8">
                <div className="flex justify-center">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                            <MessageSquare className="w-10 h-10 text-white animate-pulse" />
                        </div>
            
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Welcome to ConverseHub!
                    </h2>
                    <p className="text-lg text-base-content/70 leading-relaxed">
                        Select a conversation or start a new one to begin your messaging experience
                    </p>
                </div>

                <div className="flex justify-center gap-2 pt-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary/30 animate-bounce"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;