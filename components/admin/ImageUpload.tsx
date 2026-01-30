'use client';

import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ImageUploadProps {
    onImageSelected: (file: File) => void;
    previewUrl?: string; // Allow passing an existing preview URL (e.g. for editing)
}

export default function ImageUpload({ onImageSelected, previewUrl: initialPreview }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | undefined>(initialPreview);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFile(file);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Create a local preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        onImageSelected(file);
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(undefined);
        // You might want to notify the parent that the image was removed, depending on requirements
    };

    return (
        <div className="w-full">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                        : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    } ${preview ? 'p-0 border-none' : ''}`}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-image-upload"
                    onChange={handleFileSelect}
                />

                {preview ? (
                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group">
                        <img
                            src={preview}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={removeImage}
                                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors transform scale-90 group-hover:scale-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <label
                            htmlFor="cover-image-upload"
                            className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors cursor-pointer"
                        >
                            Change Image
                        </label>
                    </div>
                ) : (
                    <label htmlFor="cover-image-upload" className="flex flex-col items-center justify-center cursor-pointer py-8">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <Upload size={28} />
                        </div>
                        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                        </p>
                    </label>
                )}
            </div>
        </div>
    );
}
