import React from 'react';
import SearchableList from './components/SearchableList';
import { UserCheck, UserX } from 'lucide-react';

interface Attendee {
  id: number;
  name: string;
  email: string;
  status: 'Attended' | 'Absent';
  avatar: string;
}

const sampleAttendees: Attendee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Attended',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Absent',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'Attended',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    status: 'Attended',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom@example.com',
    status: 'Absent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
];

function App() {
  const renderAttendee = (attendee: Attendee, showEmail: boolean) => (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <img
          src={attendee.avatar}
          alt={attendee.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{attendee.name}</h3>
          {showEmail && (
            <p className="text-gray-500 text-sm">{attendee.email}</p>
          )}
        </div>
        <div className="flex items-center">
          {attendee.status === 'Attended' ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <UserCheck className="w-4 h-4 mr-1" />
              Attended
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <UserX className="w-4 h-4 mr-1" />
              Absent
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <SearchableList
          items={sampleAttendees}
          renderItem={renderAttendee}
          getSearchKey={(attendee) => `${attendee.name} ${attendee.email} ${attendee.status}`}
          placeholder="Search"
          emptyMessage="No attendees found"
          showEmail={true}
        />
      </div>
    </div>
  );
}

export default App;