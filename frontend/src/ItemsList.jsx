import PropTypes from 'prop-types';
import TextWithX from './TextWithX';

const ItemsList = ({ texts }) => {
    return (
        <div className="flex flex-wrap flex-grow justify-center">
            {texts.map((text) => (
                <TextWithX
                    key={text}
                    text={text}
                />
            ))}
        </div>
    );
}

ItemsList.propTypes = {
    texts: PropTypes.arrayOf(PropTypes.string),
};

ItemsList.defaultProps = {
    texts: [],
};

export default ItemsList;