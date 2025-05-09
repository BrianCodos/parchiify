import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';
import './DraftsView.scss';

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
        <div className="drafts-container">
            <h2 className="drafts-title">Mis Borradores</h2>
            <p className="drafts-subtitle">Eventos guardados para completar más tarde</p>
            
            {sortedDrafts.length > 0 ? (
                <div className="drafts-grid">
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
                <div className="drafts-empty">
                    <div className="drafts-empty-icon">
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <h3 className="drafts-empty-title">No hay borradores guardados</h3>
                    <p className="drafts-empty-text">Cuando guardes un borrador, aparecerá aquí.</p>
                </div>
            )}
        </div>
    );
};

export default DraftsView; 