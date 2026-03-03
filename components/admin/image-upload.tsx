"use client";

import { useState } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadToS3 } from "@/lib/actions/upload";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const url = await uploadToS3(formData);
            onChange(url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        onChange("");
    };

    return (
        <div className="space-y-4 w-full">
            {label && <label className="text-sm font-medium">{label}</label>}

            <div className="flex flex-wrap gap-4">
                {value ? (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={removeImage} variant="destructive" size="icon" className="h-6 w-6">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <img
                            src={value}
                            alt="Upload"
                            className="object-cover w-full h-full"
                        />
                    </div>
                ) : (
                    <div
                        className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors relative"
                        onClick={() => document.getElementById(`upload-${label || 'image'}`)?.click()}
                    >
                        {uploading ? (
                            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Click to upload image</span>
                            </>
                        )}
                        <input
                            id={`upload-${label || 'image'}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
