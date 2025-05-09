/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event } from '../../types';
import { EventForm } from '../../components/events';
import './styles.scss';

interface EventFormPageProps {
    onAddEvent: (event: Event) => void;
    onSaveDraft: (draft: Event) => void;
    onCancel: () => void;
    allMoods: string[];
    initialData?: Event;
}

const EventFormPage: React.FC<EventFormPageProps> = ({
    onAddEvent,
    onSaveDraft,
    onCancel,
    allMoods,
    initialData
}) => {
    return (
        <div className="event-form-page">
            <EventForm
                onAddEvent={onAddEvent}
                onSaveDraft={onSaveDraft}
                onCancel={onCancel}
                allMoods={allMoods}
                initialData={initialData}
            />
        </div>
    );
};

export default EventFormPage; 