import { useContext, createContext, useState } from 'react';

interface SearchContextType {
    searchValue: string | null;
    setSearchValue: (value: string | null) => void
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchValue, setSearchValue] = useState<string | null>(null)
    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) throw new Error('useSearch must be used within searchProvider');

    if (!context.searchValue || context.searchValue.length == 0) {
        context.searchValue = null;
    }

    return context;
}

export { SearchProvider, useSearch }