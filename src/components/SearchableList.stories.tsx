import type { Meta, StoryObj } from '@storybook/react';
import SearchableList from './SearchableList';
import { UserCheck, UserX } from 'lucide-react';

const meta = {
  title: 'Components/SearchableList',
  component: SearchableList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchableList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAttendees = [
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
];

const renderAttendee = (attendee: any, showEmail: boolean) => (
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

export const Default: Story = {
  args: {
    items: sampleAttendees,
    renderItem: renderAttendee,
    getSearchKey: (attendee) => `${attendee.name} ${attendee.email} ${attendee.status}`,
    placeholder: 'Search',
    emptyMessage: 'No attendees found',
    showEmail: true,
  },
};

export const WithoutEmail: Story = {
  args: {
    ...Default.args,
    showEmail: false,
  },
};