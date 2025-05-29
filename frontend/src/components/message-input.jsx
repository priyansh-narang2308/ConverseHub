import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import toast from 'react-hot-toast';
import { Image, Send, X, Smile, Mic } from 'lucide-react';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className='p-3 lg:p-4 bg-base-100 border-t border-base-300'>
            {/* Image Preview */}
            {imagePreview && (
                <div className='mb-3 relative'>
                    <div className="flex items-center gap-2 bg-base-200 p-2 rounded-lg">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-md border-2 border-primary/30"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-300">Image ready to send</p>
                            <p className="text-xs text-gray-400">Click send to share</p>
                        </div>
                        <button
                            onClick={removeImage}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                            type="button"
                            aria-label="Remove image"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="relative">
                <div className={`flex items-center gap-2 transition-all duration-200 ${isFocused ? 'ring-2 ring-primary/30 rounded-xl' : ''}`}>
                    {/* Left Action Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-primary"
                            onClick={() => fileInputRef.current?.click()}
                            aria-label="Attach image"
                        >
                            <Image size={20} />
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-primary hidden sm:flex"
                            aria-label="Emoji picker"
                        >
                            <Smile size={20} />
                        </button>
                    </div>

                    {/* Main Input */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            className="input input-bordered w-full rounded-full pl-4 pr-12 bg-base-200 border-none focus:outline-none"
                            placeholder="Type your message..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-1">
                        {text ? (
                            <button
                                type="submit"
                                className="btn btn-circle btn-sm btn-primary"
                                disabled={!text.trim() && !imagePreview}
                                aria-label="Send message"
                            >
                                <Send size={18} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-primary"
                                aria-label="Voice message"
                            >
                                <Mic size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Character Counter (optional) */}
                {text.length > 0 && (
                    <div className="absolute bottom-1 right-14 text-xs text-gray-400">
                        {text.length}/1000
                    </div>
                )}
            </form>

            {/* Features Hint (optional) */}
            <div className="text-xs text-gray-500 mt-2 flex justify-between px-2">
                <span>Press Enter to send</span>
                <span>Shift+Enter for new line</span>
            </div>
        </div>
    );
};

export default MessageInput;