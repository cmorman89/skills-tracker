import PropTypes from 'prop-types';
import TextWithPlus from './TextWithPlus';
import TextWithX from './TextWithX';

const ItemList = ({ texts, onClick, variant }) => {
    const ListVariant = variant === 'add' ? TextWithPlus : TextWithX;
    return (
        <div className="flex flex-wrap flex-grow justify-center">
            {texts.map((text) => (
                <ListVariant
                    key={text}
                    text={text}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}

ItemList.propTypes = {
    texts: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['add', 'remove']),
};

ItemList.defaultProps = {
    onClick: () => { },
    texts: [],
    variant: 'add',
};

export default ItemList;