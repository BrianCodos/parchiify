/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import { Dashboard } from '../../components/dashboard';
import './styles.scss';

interface DashboardPageProps {
    moods: string[];
    onAddMood: (moodName: string) => void;
    onDeleteMood: (moodName: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
    moods,
    onAddMood,
    onDeleteMood
}) => {
    return (
        <div className="dashboard-page">
            <Dashboard
                moods={moods}
                onAddMood={onAddMood}
                onDeleteMood={onDeleteMood}
            />
        </div>
    );
};

export default DashboardPage; 