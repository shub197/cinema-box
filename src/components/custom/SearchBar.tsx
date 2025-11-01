import { Input } from '@/components/ui/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSearch } from '@/contexts/SearchContext';

function SearchBar() {
    const [searchValue, updateSearchBarInputSearchValue] = useState<string>('');
    const { setSearchValue } = useSearch()

    function onSearchValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateSearchBarInputSearchValue(event.target.value);
        setSearchValue(event.target.value);
    }

    function clearSearchBar() {
        updateSearchBarInputSearchValue('');
        setSearchValue('');
    }

    return (
        <div>
            <div className="search-bar">
                <div className="search-input">
                    <Input
                        type="text"
                        placeholder="Search Movies & TV Shows..."
                        value={searchValue}
                        onChange={onSearchValueChange}
                        className="text-[14px]"
                    />

                    <div onClick={clearSearchBar} className="cursor-pointer absolute right-4 top-[10px]">
                        <FontAwesomeIcon className="text-[13px]" icon="times" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;