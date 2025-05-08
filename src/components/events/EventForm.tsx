import React, { useState, useEffect } from 'react';
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
    const [formData, setFormData] = useState<EventFormData>({
        place: '',
        city: '',
        date: '',
        link: '',
        mood: '',
        notes: '',
        ...initialData
    });

    const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof EventFormData, string>> = {};
        
        if (!formData.place.trim()) {
            newErrors.place = 'El lugar es requerido';
        }
        if (!formData.city.trim()) {
            newErrors.city = 'La ciudad es requerida';
        }
        if (!formData.date) {
            newErrors.date = 'La fecha es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const eventData: Event = {
                ...formData,
                id: initialData?.id || Date.now().toString()
            };
            onAddEvent(eventData);
        }
    };

    const handleSaveDraft = () => {
        const draftData: Event = {
            ...formData,
            id: initialData?.id || Date.now().toString(),
            isDraft: true
        };
        onSaveDraft(draftData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof EventFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // Base class for form inputs
    const baseInputClass = "mt-1 block w-full rounded-md bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out p-3"; // Added p-3 for padding and enhanced focus ring
    const errorInputClass = "border-red-500 focus:border-red-500 focus:ring-red-500";
    const validInputClass = "border-gray-600";

    return (
        <section className="bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 max-w-2xl mx-auto"> {/* Added max-w-2xl mx-auto for better form readability on larger screens*/}
            <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">
                    {initialData ? 'Editar Evento' : 'Nuevo Evento'}
                </h1>
            </header>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="place" className="block text-sm font-medium text-gray-300">
                        Lugar *
                    </label>
                    <input
                        type="text"
                        id="place"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        className={`${baseInputClass} ${errors.place ? errorInputClass : validInputClass}`}
                    />
                    {errors.place && <p className="mt-1.5 text-sm text-red-400">{errors.place}</p>}
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                        Ciudad *
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`${baseInputClass} ${errors.city ? errorInputClass : validInputClass}`}
                    />
                    {errors.city && <p className="mt-1.5 text-sm text-red-400">{errors.city}</p>}
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300">
                        Fecha *
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`${baseInputClass} ${errors.date ? errorInputClass : validInputClass} appearance-none`} // appearance-none can help in some browsers for date input consistency
                    />
                    {errors.date && <p className="mt-1.5 text-sm text-red-400">{errors.date}</p>}
                </div>

                <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-300">
                        Enlace
                    </label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link || ''}
                        onChange={handleChange}
                        className={`${baseInputClass} ${validInputClass}`}
                    />
                </div>

                <div>
                    <label htmlFor="mood" className="block text-sm font-medium text-gray-300">
                        Mood
                    </label>
                    <select
                        id="mood"
                        name="mood"
                        value={formData.mood || ''}
                        onChange={handleChange}
                        className={`${baseInputClass} ${validInputClass}`}
                    >
                        <option value="" className="text-gray-400">Seleccionar mood</option>
                        {allMoods.map(mood => (
                            <option key={mood} value={mood}>
                                {mood}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-300">
                        Notas
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes || ''}
                        onChange={handleChange}
                        rows={4} // Slightly more rows
                        className={`${baseInputClass} ${validInputClass}`}
                    />
                </div>

                {/* Button Group */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto px-5 py-2.5 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="w-full sm:w-auto px-5 py-2.5 border border-transparent rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out shadow-sm"
                    >
                        Guardar Borrador
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out shadow-sm"
                    >
                        {initialData ? 'Actualizar' : 'Crear'} Evento
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EventForm; 