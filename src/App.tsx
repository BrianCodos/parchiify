// @ts-nocheck
import React, { useState, useEffect } from 'react';
import type { Event, ViewType } from './types';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import EventForm from './components/events/EventForm';
import EventList from './components/events/EventList';
import EventTableView from './components/events/EventTableView';
import SavedEventsView from './components/events/SavedEventsView';
import DraftsView from './components/events/DraftsView';
import Dashboard from './components/dashboard/Dashboard';
import CalendarView from './components/calendar/CalendarView';
import { DEFAULT_MOODS } from './constants';
import './App.css';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewType>('list-cards');
    const [events, setEvents] = useState<Event[]>(() => {
        const savedEvents = localStorage.getItem('events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });
    const [drafts, setDrafts] = useState<Event[]>(() => {
        const savedDrafts = localStorage.getItem('drafts');
        return savedDrafts ? JSON.parse(savedDrafts) : [];
    });
    const [favoriteEvents, setFavoriteEvents] = useState<string[]>(() => {
        const savedFavorites = localStorage.getItem('favoriteEvents');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [moods, setMoods] = useState<string[]>(() => {
        const savedMoods = localStorage.getItem('moods');
        if (savedMoods) {
            const parsedMoods = JSON.parse(savedMoods);
            if (Array.isArray(parsedMoods) && parsedMoods.length > 0) {
                return parsedMoods;
            }
        }
        localStorage.setItem('moods', JSON.stringify(DEFAULT_MOODS));
        return DEFAULT_MOODS;
    });
    const [calendarDate, setCalendarDate] = useState<Date>(new Date());
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('drafts', JSON.stringify(drafts));
    }, [drafts]);

    useEffect(() => {
        localStorage.setItem('favoriteEvents', JSON.stringify(favoriteEvents));
    }, [favoriteEvents]);

    useEffect(() => {
        localStorage.setItem('moods', JSON.stringify(moods));
    }, [moods]);

    const addEventHandler = (newEvent: Event) => {
        if (editingEvent && !editingEvent.isDraft) {
            setEvents(prevEvents => prevEvents.map(ev => ev.id === newEvent.id ? newEvent : ev));
        } else {
            setEvents(prevEvents => [newEvent, ...prevEvents.filter(ev => ev.id !== newEvent.id)]);
        }
        if (editingEvent && editingEvent.isDraft) {
            setDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== newEvent.id));
        }
        setEditingEvent(null);
        setCurrentView('list-cards');
    };

    const saveDraftHandler = (draftEvent: Event) => {
        const draftWithFlag = { ...draftEvent, isDraft: true };
        if (editingEvent && editingEvent.isDraft) {
            setDrafts(prevDrafts => prevDrafts.map(d => d.id === draftWithFlag.id ? draftWithFlag : d));
        } else {
            setDrafts(prevDrafts => [draftWithFlag, ...prevDrafts.filter(d => d.id !== draftWithFlag.id)]);
        }
        setEditingEvent(null);
        setCurrentView('drafts');
    };

    const deleteEventHandler = (eventId: string) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        setFavoriteEvents(prevFavorites => prevFavorites.filter(id => id !== eventId));
    };

    const deleteDraftHandler = (draftId: string) => {
        setDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== draftId));
    };

    const editDraftOrEventHandler = (eventData: Event) => {
        setEditingEvent(eventData);
        setCurrentView('form');
    };

    const toggleFavoriteHandler = (eventId: string) => {
        setFavoriteEvents(prevFavorites =>
            prevFavorites.includes(eventId)
                ? prevFavorites.filter(id => id !== eventId)
                : [...prevFavorites, eventId]
        );
    };

    const addMoodHandler = (moodName: string) => {
        if (moodName && !moods.includes(moodName)) {
            setMoods(prevMoods => [...prevMoods, moodName]);
        } else if (moods.includes(moodName)) {
            alert('Este mood ya existe.');
        }
    };

    const deleteMoodHandler = (moodToDelete: string) => {
        setMoods(prevMoods => prevMoods.filter(mood => mood !== moodToDelete));
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case 'form':
                return (
                    <EventForm
                        onAddEvent={addEventHandler}
                        onSaveDraft={saveDraftHandler}
                        allMoods={moods}
                        onCancel={() => {
                            setCurrentView('list-cards');
                            setEditingEvent(null);
                        }}
                        initialData={editingEvent || undefined}
                    />
                );
            case 'calendar':
                return (
                    <CalendarView
                        events={events}
                        calendarDate={calendarDate}
                        setCalendarDate={setCalendarDate}
                        onToggleFavorite={toggleFavoriteHandler}
                        onEditEvent={editDraftOrEventHandler}
                        favoriteEvents={favoriteEvents}
                    />
                );
            case 'saved':
                return (
                    <SavedEventsView
                        events={events.filter(event => favoriteEvents.includes(event.id))}
                        onToggleFavorite={toggleFavoriteHandler}
                        onDeleteEvent={deleteEventHandler}
                        favoriteEvents={favoriteEvents}
                        onEditEvent={editDraftOrEventHandler}
                    />
                );
            case 'dashboard':
                return (
                    <Dashboard
                        moods={moods}
                        onAddMood={addMoodHandler}
                        onDeleteMood={deleteMoodHandler}
                    />
                );
            case 'drafts':
                return (
                    <DraftsView
                        drafts={drafts}
                        onEditDraft={editDraftOrEventHandler}
                        onDeleteDraft={deleteDraftHandler}
                    />
                );
            case 'list-table':
                return (
                    <EventTableView
                        events={events}
                        onEditEvent={editDraftOrEventHandler}
                        onDeleteEvent={deleteEventHandler}
                    />
                );
            case 'list-cards':
            default:
                return (
                    <EventList
                        events={events}
                        onToggleFavorite={toggleFavoriteHandler}
                        onDeleteEvent={deleteEventHandler}
                        favoriteEvents={favoriteEvents}
                        onEditEvent={editDraftOrEventHandler}
                    />
                );
        }
    };

    return (
        <div className="app-container">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="app-content">
                <Sidebar
                    setCurrentView={setCurrentView}
                    currentView={currentView}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    setEditingEvent={setEditingEvent}
                />
                {isSidebarOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
                <main className="main-content styled-scrollbar">
                    <div className="content-wrapper">
                        <div className="content-container">
                            {renderCurrentView()}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
