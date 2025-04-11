import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import styles from './SearchableList.module.css';

interface SearchableListProps<T> {
  items: T[];
  renderItem: (item: T, showEmail: boolean) => React.ReactNode;
  getSearchKey: (item: T) => string;
  placeholder?: string;
  emptyMessage?: string;
  showEmail?: boolean;
}

function SearchableList<T extends { status: string }>({
  items,
  renderItem,
  getSearchKey,
  placeholder = 'Search...',
  emptyMessage = 'No items found',
  showEmail = true
}: SearchableListProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      getSearchKey(item).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery, getSearchKey]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const status = item.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(item);
      return acc;
    }, {} as Record<string, T[]>);
  }, [filteredItems]);

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={styles.searchContainer}>
      <div className="relative">
        <div className={`${styles.searchBar} ${searchQuery.trim() !== '' ? styles.searchBarActive : ''}`}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {searchQuery.trim() !== '' && (
          <div className={styles.resultsContainer}>
            {Object.entries(groupedItems).length > 0 ? (
              Object.entries(groupedItems).map(([status, statusItems]) => (
                <div key={status} className={styles.statusGroup}>
                  <button
                    onClick={() => toggleSection(status)}
                    className={styles.statusHeader}
                  >
                    <span className={styles.statusTitle}>
                      {status} ({statusItems.length})
                    </span>
                    {collapsedSections[status] ? (
                      <ChevronRight className={styles.statusIcon} />
                    ) : (
                      <ChevronDown className={styles.statusIcon} />
                    )}
                  </button>
                  {!collapsedSections[status] && (
                    <div className={styles.itemsList}>
                      {statusItems.map((item, index) => (
                        <div key={index} className={styles.fadeIn}>
                          {renderItem(item, showEmail)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.emptyMessage}>{emptyMessage}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchableList;