import type { Meta, StoryObj } from '@storybook/react';
import SearchableList from '../components/SearchableList';
import { UserCheck, UserX, Zap, Clock, Ban } from 'lucide-react';

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

// Sample data sets
const attendanceList = [
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

const tasksList = [
  {
    id: 1,
    name: 'Update documentation',
    email: 'project@company.com',
    status: 'In Progress',
    avatar: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=100&h=100&fit=crop&crop=entropy'
  },
  {
    id: 2,
    name: 'Fix login bug',
    email: 'dev@company.com',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop&crop=entropy'
  },
  {
    id: 3,
    name: 'Deploy to production',
    email: 'ops@company.com',
    status: 'Blocked',
    avatar: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop&crop=entropy'
  },
];

const emptyList = [];

// Render functions
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

const renderTask = (task: any, showEmail: boolean) => (
  <div className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-4">
      <img
        src={task.avatar}
        alt={task.name}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{task.name}</h3>
        {showEmail && (
          <p className="text-gray-500 text-sm">{task.email}</p>
        )}
      </div>
      <div className="flex items-center">
        {task.status === 'In Progress' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <Zap className="w-4 h-4 mr-1" />
            In Progress
          </span>
        )}
        {task.status === 'Pending' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </span>
        )}
        {task.status === 'Blocked' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <Ban className="w-4 h-4 mr-1" />
            Blocked
          </span>
        )}
      </div>
    </div>
  </div>
);

// Stories
export const AttendanceListWithEmail: Story = {
  args: {
    items: attendanceList,
    renderItem: renderAttendee,
    getSearchKey: (attendee) => `${attendee.name} ${attendee.email} ${attendee.status}`,
    placeholder: 'Search',
    emptyMessage: 'No attendees found',
    showEmail: true,
  },
};

export const AttendanceListWithoutEmail: Story = {
  args: {
    ...AttendanceListWithEmail.args,
    showEmail: false,
  },
};

export const TaskList: Story = {
  args: {
    items: tasksList,
    renderItem: renderTask,
    getSearchKey: (task) => `${task.name} ${task.email} ${task.status}`,
    placeholder: 'Search tasks',
    emptyMessage: 'No tasks found',
    showEmail: true,
  },
};

export const EmptyState: Story = {
  args: {
    items: emptyList,
    renderItem: renderAttendee,
    getSearchKey: (item) => '',
    placeholder: 'Search',
    emptyMessage: 'No items found',
    showEmail: true,
  },
};

export const WithLongList: Story = {
  args: {
    items: [
      ...attendanceList,
      ...attendanceList.map(item => ({ ...item, id: item.id + 3 })),
      ...attendanceList.map(item => ({ ...item, id: item.id + 6 })),
    ],
    renderItem: renderAttendee,
    getSearchKey: (attendee) => `${attendee.name} ${attendee.email} ${attendee.status}`,
    placeholder: 'Search',
    emptyMessage: 'No attendees found',
    showEmail: true,
  },
};