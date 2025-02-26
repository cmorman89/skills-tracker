import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SkillExampleList = ({ exampleList, onClick }) => {
    return (
        <div className="flex flex-col flex-grow text-slate-300 mb-4 items-center justify-center">
            {exampleList.map((example, index) => (
                <div
                    className="flex flex-grow w-full flex-nowrap"
                    key={index}
                >
                    <div className="mr-2 mb-2 block w-full p-2 border border-slate-600 rounded-md shadow-lg bg-slate-900/40">
                        {example}
                    </div>
                    <div
                        className="flex justify-center items-center h-10 w-10 p-2 border border-pink-600/50 rounded-md shadow-lg bg-pink-600/30"
                        onClick={() => onClick(index)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            ))}
        </div>
    )
}
SkillExampleList.propTypes = {
    exampleList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default SkillExampleList;