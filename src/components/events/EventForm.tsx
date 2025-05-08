import React, { useState, useEffect, useRef } from 'react';
import type { Event, EventFormData } from '../../types';

interface EventFormProps {
    onAddEvent: (event: Event) => void;
    onSaveDraft: (draft: Event) => void;
    onCancel: () => void;
    allMoods: string[];
    initialData?: Event;
}

const EventForm: React.FC<EventFormProps> = ({
    onAddEvent,
    onSaveDraft,
    onCancel,
    allMoods,
    initialData
}) => {
    const [formData, setFormData] = useState<EventFormData>(() => {
        const defaults: EventFormData = {
            place: '',
            city: '',
            date: '',
            link: '',
            mood: '',
            notes: '',
            imageUrl: '',
            entryType: 'Gratuito',
            coverFee: '',
            selectedMoods: [],
        };
        return initialData ? { 
            ...defaults, 
            ...initialData,
            selectedMoods: initialData.mood ? initialData.mood.split(',') : []
        } : defaults;
    });

    const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialData) {
            const defaults: EventFormData = {
                place: '', city: '', date: '', link: '', mood: '', notes: '', imageUrl: '',
                entryType: 'Gratuito', coverFee: '', selectedMoods: []
            };
            const updatedData = { 
                ...defaults, 
                ...initialData,
                selectedMoods: initialData.mood ? initialData.mood.split(',') : [] 
            };
            setFormData(updatedData);
            setImagePreview(initialData.imageUrl || null);
        } else {
            setFormData({
                place: '', city: '', date: '', link: '', mood: '', notes: '', imageUrl: '',
                entryType: 'Gratuito', coverFee: '', selectedMoods: []
            });
            setImagePreview(null);
        }
    }, [initialData]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof EventFormData, string>> = {};
        if (!formData.place.trim()) newErrors.place = 'El lugar es requerido';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
        if (!formData.date) newErrors.date = 'La fecha es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const eventData: Event = {
                ...formData,
                id: initialData?.id || Date.now().toString(),
                mood: formData.selectedMoods?.join(',') || ''
            };
            onAddEvent(eventData);
        }
    };

    const handleSaveDraft = () => {
        const draftData: Event = {
            ...formData,
            id: initialData?.id || Date.now().toString(),
            isDraft: true,
            mood: formData.selectedMoods?.join(',') || ''
        };
        onSaveDraft(draftData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof EventFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                cropImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const cropImage = (imageSrc: string) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const targetWidth = 1080;
            const targetHeight = 1035;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const imgAspectRatio = img.width / img.height;
            const targetAspectRatio = targetWidth / targetHeight;

            let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

            if (imgAspectRatio > targetAspectRatio) {
                sWidth = img.height * targetAspectRatio;
                sx = (img.width - sWidth) / 2;
            } else if (imgAspectRatio < targetAspectRatio) {
                sHeight = img.width / targetAspectRatio;
                sy = (img.height - sHeight) / 2;
            }

            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            setImagePreview(croppedDataUrl);
            setFormData(prev => ({ ...prev, imageUrl: croppedDataUrl }));
        };
        img.src = imageSrc;
    };
    
    const toggleMood = (mood: string) => {
        setFormData(prev => {
            const selectedMoods = prev.selectedMoods || [];
            if (selectedMoods.includes(mood)) {
                return { 
                    ...prev, 
                    selectedMoods: selectedMoods.filter(m => m !== mood) 
                };
            } else {
                if (selectedMoods.length >= 5) {
                    return prev; // Max 5 moods
                }
                return { 
                    ...prev, 
                    selectedMoods: [...selectedMoods, mood] 
                };
            }
        });
    };

    const inputClass = "w-full bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500";
    const labelClass = "text-sm text-gray-400 mb-1 block";
    
    return (
        <div className="bg-gray-900 text-white w-full max-w-5xl mx-auto p-6 rounded-lg shadow-md border border-gray-800">
            <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">
                {initialData ? 'Editar Evento' : 'Añadir Nuevo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <label htmlFor="place" className={labelClass}>Lugar/Nombre:</label>
                            <input
                                type="text"
                                id="place"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            {errors.place && <p className="text-red-500 mt-1 text-sm">{errors.place}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="city" className={labelClass}>Ciudad:</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                <option value="">Seleccionar ciudad</option>
                                <option value="Cali">Cali</option>
                                <option value="Bogotá">Bogotá</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Barranquilla">Barranquilla</option>
                                <option value="Cartagena">Cartagena</option>
                            </select>
                            {errors.city && <p className="text-red-500 mt-1 text-sm">{errors.city}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="notes" className={labelClass}>Descripción (Opcional):</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleChange}
                                rows={5}
                                className={inputClass}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <div className="mb-4">
                            <label htmlFor="date" className={labelClass}>Fecha:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="mm/dd/yyyy"
                            />
                            {errors.date && <p className="text-red-500 mt-1 text-sm">{errors.date}</p>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="link" className={labelClass}>Enlace (Opcional):</label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={formData.link || ''}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="https://..."
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className={labelClass}>Imagen:</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-slate-700 text-slate-200 hover:bg-slate-600 py-2 px-4 rounded-md mr-2"
                                >
                                    Choose File
                                </button>
                                <span className="text-slate-400">
                                    {imagePreview ? 'Imagen seleccionada' : 'No file chosen'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="entryType" className={labelClass}>Tipo Entrada:</label>
                                <input
                                    type="text"
                                    id="entryType"
                                    name="entryType"
                                    value={formData.entryType || 'Gratuito'}
                                    disabled
                                    className={`${inputClass} opacity-70`}
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="coverFee" className={labelClass}>Cover (COP):</label>
                                <input
                                    type="text"
                                    id="coverFee"
                                    name="coverFee"
                                    value={formData.coverFee || ''}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 mb-6">
                    <label className={labelClass}>Moods (Máx. 5):</label>
                    <div className="bg-slate-800 border border-slate-600 rounded-md p-3">
                        <div className="flex flex-wrap gap-2">
                            {allMoods.map(mood => (
                                <button
                                    key={mood}
                                    type="button"
                                    onClick={() => toggleMood(mood)}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        formData.selectedMoods?.includes(mood)
                                            ? 'bg-slate-300 text-slate-800 hover:bg-slate-200'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="mb-6">
                    <label className={labelClass}>Notificaciones (Simulado):</label>
                    <p className="text-sm text-gray-400">Selecciona fecha para ver opciones.</p>
                </div>
                
                <div className="flex justify-end gap-4 mt-10">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="px-5 py-2 bg-slate-600 text-slate-200 rounded-md hover:bg-slate-500 transition-colors duration-200"
                    >
                        Guardar Borrador
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 bg-slate-500 text-slate-100 rounded-md hover:bg-slate-400 transition-colors duration-200"
                    >
                        Guardar Evento
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm; 