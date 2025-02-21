import { useState } from 'react';
import ItemList from './ItemList';
import PropTypes from 'prop-types';
import TextInput from './TextInput';

const FilterItemList = ({ texts, id, name = id, label, onClick, variant, results, resultsOnEmpty }) => {
    const [filterText, setFilterText] = useState('');

    // Get all safe parents from the API

    // Default items to show in the list
    const items = texts && texts.length > 0 ? texts : [
        'Apple',
        'Banana',
        'Orange',
        'Grapes',
        'Pineapple',
        'Mango',
        'Peach',
        'P',
        'Plum',
        'Pomegranate',
        'Pear',
        'Papaya',
        'Pawpaw',
        'Pine',
        'Pork',
        'Pasta',
        'Pizza',
        'Pancake',
        'Pudding',
        'Peanut',
        'Peanut Butter',
        'Peanut Brittle'
    ];
    const filterResults = () => {
        const filtered = filterText
            ? items.filter((item) => item.toLowerCase().includes(filterText.toLowerCase()))
            : items;
        
        // Populate the list only if search term is present or resultsOnEmpty is true
        if (resultsOnEmpty || filterText) {
            // If results is greater than 0, return only the first n results
            // Otherwise, return the entire filtered list
            return results > 0 ? filtered.slice(0, results) : filtered;
        }
        // Return an empty array for a blank list
        return [];
    }   

    return (
        <div className="mb-2">
            <div className="mb-4">
                <TextInput
                    label={label}
                    id={id}
                    name={name}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Search..."
                    value={filterText}
                />
            </div>

            <ItemList
                texts={filterResults()}
                onClick={onClick}
                variant={variant}
            />
        </div>
    );
};

FilterItemList.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    results: PropTypes.number,
    resultsOnEmpty: PropTypes.bool,
    texts: PropTypes.arrayOf(PropTypes.string),
    variant: PropTypes.oneOf(['add', 'remove']),
};

FilterItemList.defaultProps = {
    onClick: (value) => { console.log(value); },
    results: 0,
    resultsOnEmpty: false,
    texts: [],
    variant: 'add',
};

export default FilterItemList;
