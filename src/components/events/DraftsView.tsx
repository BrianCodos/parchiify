import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';

interface DraftsViewProps {
    drafts: Event[];
    onEditDraft: (event: Event) => void;
    onDeleteDraft: (draftId: string) => void;
}

const DraftsView: React.FC<DraftsViewProps> = ({
    drafts,
    onEditDraft,
    onDeleteDraft
}) => {
    const sortedDrafts = [...drafts].sort((a, b) => parseInt(b.id) - parseInt(a.id));

    return (
        <section className="rounded-lg p-6 sm:p-8 border border-gray-700">
            <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Mis Borradores</h1>
            </header>
            {sortedDrafts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedDrafts.map(draft => (
                        <EventCard
                            key={draft.id}
                            event={draft}
                            onEditEvent={onEditDraft}
                            onDeleteEvent={onDeleteDraft}
                            isDraftCard={true}
                            onToggleFavorite={() => {}}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 py-12 border border-gray-700 border-dashed rounded-lg">
                    <i className="fas fa-file-alt fa-2x mb-3 text-gray-500"></i>
                    <h2 className="text-xl font-semibold text-gray-300 mb-1">No hay borradores guardados</h2>
                    <p className="text-gray-500">Cuando guardes un borrador, aparecerá aquí.</p>
                </div>
            )}
        </section>
    );
};

export default DraftsView; 