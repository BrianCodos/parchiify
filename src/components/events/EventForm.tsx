import React, { useState, useEffect, useRef } from 'react';
import type { Event, EventFormData } from '../../types';
import './EventForm.css';

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
    
    return (
        <div className="event-form-container">
            <h2 className="event-form-title">
                {initialData ? 'Editar Evento' : 'Añadir Nuevo Evento'}
            </h2>
            
            <form onSubmit={handleSubmit}>
                <div className="event-form-grid">
                    <div className="event-form-column">
                        <div className="form-group">
                            <label htmlFor="place">Lugar/Nombre:</label>
                            <input
                                type="text"
                                id="place"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                className={errors.place ? "form-input error" : "form-input"}
                            />
                            {errors.place && <p className="error-message">{errors.place}</p>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="city">Ciudad:</label>
                            <select
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={errors.city ? "form-select error" : "form-select"}
                            >
                                <option value="">Seleccionar ciudad</option>
                                <option value="Cali">Cali</option>
                                <option value="Bogotá">Bogotá</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Barranquilla">Barranquilla</option>
                                <option value="Cartagena">Cartagena</option>
                            </select>
                            {errors.city && <p className="error-message">{errors.city}</p>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="notes">Descripción (Opcional):</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleChange}
                                rows={5}
                                className="form-textarea"
                            />
                        </div>
                    </div>
                    
                    <div className="event-form-column">
                        <div className="form-group">
                            <label htmlFor="date">Fecha:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={errors.date ? "form-input error" : "form-input"}
                                placeholder="mm/dd/yyyy"
                            />
                            {errors.date && <p className="error-message">{errors.date}</p>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="link">Enlace (Opcional):</label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={formData.link || ''}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="https://..."
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Imagen:</label>
                            <div className="image-upload">
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
                                    className="file-upload-btn"
                                >
                                    Choose File
                                </button>
                                <span className="file-name">
                                    {imagePreview ? 'Imagen seleccionada' : 'No file chosen'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="entry-fee-grid">
                            <div className="form-group">
                                <label htmlFor="entryType">Tipo Entrada:</label>
                                <input
                                    type="text"
                                    id="entryType"
                                    name="entryType"
                                    value={formData.entryType || 'Gratuito (Desactivado)'}
                                    disabled
                                    className="form-input disabled"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="coverFee">Cover (COP):</label>
                                <input
                                    type="text"
                                    id="coverFee"
                                    name="coverFee"
                                    value={formData.coverFee || ''}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="moods-container">
                    <label>Moods (Máx. 5):</label>
                    <div className="moods-selector">
                        <div className="moods-buttons">
                            {allMoods.map(mood => (
                                <button
                                    key={mood}
                                    type="button"
                                    onClick={() => toggleMood(mood)}
                                    className={formData.selectedMoods?.includes(mood) ? "mood-button selected" : "mood-button"}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="notifications-container">
                    <label>Notificaciones (Simulado):</label>
                    <p className="notifications-helper">Selecciona fecha para ver opciones.</p>
                </div>
                
                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn-cancel"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="btn-save-draft"
                    >
                        Guardar Borrador
                    </button>
                    <button
                        type="submit"
                        className="btn-save"
                    >
                        Guardar Evento
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm; 