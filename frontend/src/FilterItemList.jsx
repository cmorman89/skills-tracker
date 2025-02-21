import React, { useState } from 'react';
import TextInput from './TextInput';
import ItemList from './ItemList';

const FilterItemList = ({ onClick }) => {
    const [filterText, setFilterText] = useState('');

    const items = [
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
        'Pineapple',
        'Pork',
        'Pasta',
        'Pizza',
        'Pancake',
        'Pudding',
        'Peanut',
        'Peanut Butter',
        'Peanut Brittle'
    ];

    const filteredItems = filterText
        ? items.filter(item =>
            item.toLowerCase().includes(filterText.toLowerCase())
        )
        : [];

    const topItems = filteredItems.slice(0, 10);

    return (
        <div className="mb-4">
            <div className="mb-4">
                <TextInput
                    label="Add a Parent Skill"
                    id="searchSkillParent"
                    name="searchSkillParent"
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Search..."
                    value={filterText}
                />
            </div>

            <ItemList
                texts={topItems}
                onClick={onClick}
            />

        </div>
    );
};

export default FilterItemList;
