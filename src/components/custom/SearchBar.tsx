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
        <div className="w-[320px] relative search-bar mx-auto bg-[#fafafa]">
            <Input
                type="text"
                placeholder="Search Movies & TV Shows..."
                value={searchValue}
                onChange={onSearchValueChange}
            />

            <div onClick={clearSearchBar} className="cursor-pointer absolute right-2 top-[5px]">
                <FontAwesomeIcon icon="times" />
            </div>
        </div>
    )
}

export default SearchBar;