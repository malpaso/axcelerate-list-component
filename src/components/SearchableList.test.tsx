import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchableList from './SearchableList';

interface TestItem {
  id: number;
  name: string;
  email: string;
  status: string;
}

const testItems: TestItem[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Active' },
];

const renderItem = (item: TestItem, showEmail: boolean) => (
  <div data-testid={`item-${item.id}`}>
    <div>{item.name}</div>
    {showEmail && <div>{item.email}</div>}
    <div>{item.status}</div>
  </div>
);

describe('SearchableList', () => {
  beforeEach(() => {
    render(
      <SearchableList
        items={testItems}
        renderItem={renderItem}
        getSearchKey={(item) => `${item.name} ${item.email} ${item.status}`}
        placeholder="Search"
        emptyMessage="No items found"
        showEmail={true}
      />
    );
  });

  it('renders search input with correct placeholder', () => {
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('shows no results initially when search is empty', () => {
    const resultsContainer = screen.queryByRole('list');
    expect(resultsContainer).not.toBeInTheDocument();
  });

  it('filters items based on search query', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    await userEvent.type(searchInput, 'john');

    expect(screen.getByText('Active (1)')).toBeInTheDocument();
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.queryByTestId('item-2')).not.toBeInTheDocument();
  });

  it('shows empty message when no items match search', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    await userEvent.type(searchInput, 'xyz');

    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('toggles section collapse when clicking on status header', async () => {
    const searchInput = screen.getByPlaceholderText('Search');
    await userEvent.type(searchInput, 'doe');

    const statusHeader = screen.getByText('Active (1)');
    await userEvent.click(statusHeader);

    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument();

    await userEvent.click(statusHeader);
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
  });

  it('shows/hides email based on showEmail prop', () => {
    const { rerender } = render(
      <SearchableList
        items={testItems}
        renderItem={renderItem}
        getSearchKey={(item) => `${item.name} ${item.email} ${item.status}`}
        placeholder="Search"
        showEmail={false}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'john' } });

    expect(screen.queryByText('john@example.com')).not.toBeInTheDocument();

    rerender(
      <SearchableList
        items={testItems}
        renderItem={renderItem}
        getSearchKey={(item) => `${item.name} ${item.email} ${item.status}`}
        placeholder="Search"
        showEmail={true}
      />
    );

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});