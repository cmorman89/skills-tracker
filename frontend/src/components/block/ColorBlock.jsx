import PropTypes from 'prop-types';

const ColorBlock = ({ children }) => {
    return (
        <div
            className="
            flex
            px-6 pt-24 pb-16
            min-h-32
            mx-24 my-4
            rounded-3xl
            overflow-hidden
            shadow-lg
            bg-gradient-to-br from-pink-500 to-purple-700 bg-
            text-white font-inter
            "
        >
            <div
                className="
                flex flex-col
                w-1/2
                hover-float
                ">
                <h1 className='font-semibold text-5xl mb-4 hover-float'>
                    Know what you <span className="italic font-semibold text-amber-300">know</span>.
                </h1>
                <p className='font-inter text-lg font-light'>
                    With SkillAtlas, you can easily track your skills and knowledge, and examples of your work.
                </p>
            </div>
            <div className='flex w-1/2 h-full items-baseline justify-end'>
                <img src="brain.png" alt="brain" className='w-2/3 mr-1 mt-3 hover-float' />
            </div>
            
        </div>
    )
}

ColorBlock.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
}
ColorBlock.defaultProps = {
    children: null,
}
export default ColorBlock;