/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event } from '../../types';
import { DraftsView } from '../../components/events';
import './styles.scss';

interface DraftsPageProps {
    drafts: Event[];
    onEditDraft: (draft: Event) => void;
    onDeleteDraft: (draftId: string) => void;
}

const DraftsPage: React.FC<DraftsPageProps> = ({
    drafts,
    onEditDraft,
    onDeleteDraft
}) => {
    return (
        <div className="drafts-page">
            <DraftsView
                drafts={drafts}
                onEditDraft={onEditDraft}
                onDeleteDraft={onDeleteDraft}
            />
        </div>
    );
};

export default DraftsPage; 