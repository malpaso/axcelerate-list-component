# Searchable List Component

A flexible and reusable React component for creating searchable lists with grouping, filtering, and collapsible sections. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔍 Real-time search filtering
- 📑 Automatic grouping by status
- 🔄 Collapsible sections
- 📱 Responsive design
- 🎨 Customizable rendering
- ✨ Smooth animations
- 📧 Optional email display
- 🧪 Comprehensive test coverage
- 📚 Storybook documentation

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Testing

Run the test suite:

```bash
npm run test
```

To run tests in watch mode:

```bash
npm run test -- --watch
```

### Storybook

View component documentation and examples:

```bash
npm run storybook
```

The Storybook documentation will be available at `http://localhost:6006`.

## Component Usage

```tsx
import SearchableList from './components/SearchableList';

interface Item {
  id: number;
  name: string;
  email: string;
  status: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active"
  }
  // ... more items
];

const renderItem = (item: Item, showEmail: boolean) => (
  <div>
    <h3>{item.name}</h3>
    {showEmail && <p>{item.email}</p>}
    <span>{item.status}</span>
  </div>
);

function App() {
  return (
    <SearchableList
      items={items}
      renderItem={renderItem}
      getSearchKey={(item) => `${item.name} ${item.email} ${item.status}`}
      placeholder="Search items..."
      emptyMessage="No items found"
      showEmail={true}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `T[]` | Array of items to display in the list |
| `renderItem` | `(item: T, showEmail: boolean) => React.ReactNode` | Function to render each item |
| `getSearchKey` | `(item: T) => string` | Function to generate the search key for each item |
| `placeholder` | `string` | Placeholder text for the search input |
| `emptyMessage` | `string` | Message to display when no items match the search |
| `showEmail` | `boolean` | Whether to display email addresses |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run test suite
- `npm run storybook` - Start Storybook documentation
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run ESLint

## Storybook Documentation

The component is documented in Storybook with the following stories:

- `AttendanceListWithEmail` - Default view with email addresses
- `AttendanceListWithoutEmail` - List with hidden email addresses
- `TaskList` - Alternative data structure with different status types
- `EmptyState` - Empty list state
- `WithLongList` - Large dataset example

Each story demonstrates different component configurations and use cases.