'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bold, Italic, Link as LinkIcon, List, Heading, Code, Eye, Edit2, Quote, Image as ImageIcon } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { uploadPostImage } from '@/lib/uploadImage';

interface PostEditorProps {
    content: string;
    onChange: (value: string) => void;
}

export default function PostEditor({ content, onChange }: PostEditorProps) {
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const insertText = (before: string, after = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const previousText = textarea.value;
        const selectedText = previousText.substring(start, end);

        const newText = previousText.substring(0, start) +
            before + selectedText + after +
            previousText.substring(end);

        onChange(newText);

        // Reset cursor position
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length,
                end + before.length
            );
        }, 0);
    };

    const handleToolbarClick = (action: string) => {
        switch (action) {
            case 'bold':
                insertText('**', '**');
                break;
            case 'italic':
                insertText('*', '*');
                break;
            case 'heading':
                insertText('## ');
                break;
            case 'list':
                insertText('- ');
                break;
            case 'quote':
                insertText('> ');
                break;
            case 'code':
                insertText('`', '`');
                break;
            case 'link':
                insertText('[', '](url)');
                break;
            case 'image':
                fileInputRef.current?.click();
                break;
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Show a temporary loading placeholder
                const tempId = `uploading-${Date.now()}`;
                insertText(`![Uploading...]()`);

                // Upload to Firebase Storage
                const fileName = `editor-${Date.now()}`;
                const imageUrl = await uploadPostImage(file, 'post_images', fileName);

                // Replace the last inserted text (we'll just append for now to be safe, or we could do a real replacement)
                // For simplicity in this editor, we'll just insert the real one
                // Better approach: remove placeholder and insert real one

                const textarea = textareaRef.current;
                if (textarea) {
                    const currentContent = textarea.value;
                    const newContent = currentContent.replace('![Uploading...]()', `![${file.name}](${imageUrl})`);
                    onChange(newContent);
                }
            } catch (error: any) {
                console.error('Editor image upload failed:', error);
                alert(`Failed to upload editor image: ${error.message}`);

                // Clean up placeholder
                const textarea = textareaRef.current;
                if (textarea) {
                    const currentContent = textarea.value;
                    const newContent = currentContent.replace('![Uploading...]()', '');
                    onChange(newContent);
                }
            }
        }
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col h-[600px]">
            {/* Hidden File Input for Images */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
            />

            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center gap-1 overflow-x-auto">
                    <ToolbarButton icon={Bold} onClick={() => handleToolbarClick('bold')} label="Bold" />
                    <ToolbarButton icon={Italic} onClick={() => handleToolbarClick('italic')} label="Italic" />
                    <ToolbarButton icon={Heading} onClick={() => handleToolbarClick('heading')} label="Heading" />
                    <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <ToolbarButton icon={List} onClick={() => handleToolbarClick('list')} label="List" />
                    <ToolbarButton icon={Quote} onClick={() => handleToolbarClick('quote')} label="Quote" />
                    <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <ToolbarButton icon={LinkIcon} onClick={() => handleToolbarClick('link')} label="Link" />
                    <ToolbarButton icon={ImageIcon} onClick={() => handleToolbarClick('image')} label="Image" />
                    <ToolbarButton icon={Code} onClick={() => handleToolbarClick('code')} label="Code" />
                </div>

                <div className="flex bg-zinc-200 dark:bg-zinc-800 rounded-lg p-1 shrink-0 ml-2">
                    <button
                        onClick={() => setIsPreview(false)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!isPreview
                            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
                            }`}
                    >
                        <Edit2 size={16} />
                        Write
                    </button>
                    <button
                        onClick={() => setIsPreview(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isPreview
                            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                            : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400'
                            }`}
                    >
                        <Eye size={16} />
                        Preview
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden relative">
                {isPreview ? (
                    <div className="h-full overflow-auto p-6 prose prose-zinc dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ ...props }) => {
                                    const src = typeof props.src === "string" ? props.src.trim() : "";

                                    // If src is missing/empty, don't render an img at all
                                    if (!src) return null;

                                    return (
                                        <img
                                            {...props}
                                            src={src}
                                            className="rounded-lg max-w-full shadow-sm"
                                        />
                                    );
                                },
                            }}
                        >
                            {content || '*No content yet...*'}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Write your amazing post here... (Markdown supported)"
                        className="w-full h-full p-6 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-zinc-800 dark:text-zinc-200"
                    />
                )}
            </div>

            {/* Footer / Status bar */}
            <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 flex justify-between">
                <span>Markdown supported</span>
                <span>{content.length} characters</span>
            </div>
        </div>
    );
}

function ToolbarButton({ icon: Icon, onClick, label }: { icon: any, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title={label}
            type="button"
        >
            <Icon size={18} />
        </button>
    );
}
