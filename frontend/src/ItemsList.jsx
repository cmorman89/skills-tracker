import PropTypes from 'prop-types';
import TextWithX from './TextWithX';

const ItemsList = ({ texts, onClick }) => {
    return (
        <div className="flex flex-wrap flex-grow justify-center">
            {texts.map((text) => (
                <TextWithX
                    key={text}
                    text={text}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}

ItemsList.propTypes = {
    texts: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
};

ItemsList.defaultProps = {
    onClick: () => {},
    texts: [],
};

export default ItemsList;