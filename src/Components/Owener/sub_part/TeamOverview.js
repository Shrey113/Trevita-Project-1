import React from 'react';
import './TeamOverview.css'; // Optional CSS file for styling

const TeamOverview = () => {
    const teamData = [
        { name: 'John Doe', role: 'Photographer', eventAssignment: 'Wedding Event', status: 'Active' },
        { name: 'Jane Smith', role: 'Editor', eventAssignment: '', status: 'Active' },
        { name: 'Mike Johnson', role: 'Videographer', eventAssignment: 'Corporate Event', status: 'Inactive' },
        { name: 'Anna Lee', role: 'Assistant', eventAssignment: 'Birthday Party', status: 'Active' },
    ];

    const summaryCardData = {
        totalMembers: teamData.length,
        availableMembers: teamData.filter(member => member.status === 'Active' && !member.eventAssignment).length,
        inWorkWithEvent: teamData.filter(member => member.eventAssignment).length,
    };

    return (
        <div className="team-overview">
            {/* Filters and Search */}
            <div className="filters-search">
                <input type="text" placeholder="Search team members..." />
            </div>

            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="summary-card">
                    <h3>Total Team Members</h3>
                    <p>{summaryCardData.totalMembers}</p>
                </div>
                <div className="summary-card">
                    <h3>Available Members</h3>
                    <p>{summaryCardData.availableMembers}</p>
                </div>
                <div className="summary-card">
                    <h3>In Work with Event</h3>
                    <p>{summaryCardData.inWorkWithEvent}</p>
                </div>
            </div>

            {/* Team Member List */}
            <div className="team-member-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Event Assignment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamData.map((member, index) => (
                            <tr key={index}>
                                <td>{member.name}</td>
                                <td>{member.role}</td>
                                <td>{member.eventAssignment || 'Unassigned'}</td>
                                <td>{member.status}</td>
                                <td>
                                    <button onClick={() => alert(`Edit ${member.name}`)}>Edit</button>
                                    <button onClick={() => alert(`Assign ${member.name} to Event`)}>Assign</button>
                                    <button onClick={() => alert(`Remove ${member.name} from Event`)}>Remove</button>
                                    <button onClick={() => alert(`View Profile of ${member.name}`)}>View Profile</button>
                                    <button onClick={() => alert(`Deactivate ${member.name}`)}>Deactivate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamOverview;
