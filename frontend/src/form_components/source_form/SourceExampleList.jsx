import { faCheck, faP, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import EditTextWithButton from '../input/EditTextWithButton';

const SourceExampleList = ({ exampleList, onChange, onClick }) => {



    return (
        <div className="flex flex-col flex-grow text-slate-300 mb-4 justify-center">
            {
                // Only show the title if there are examples
                exampleList.length > 0 &&
                <div className="block text-sm font-medium text-slate-300 text-left items-start mb-1">
                    Current Examples
                </div>
            }
            {
                // Map through the example list and render each example
                exampleList.map((example, index) => (
                    <div
                        className="flex flex-grow w-full flex-nowrap"
                        key={index}
                    >
                        <EditTextWithButton
                            buttonDeleteIcon={faXmark}
                            buttonEditIcon={faPencil}
                            buttonSaveIcon={faCheck}
                            label="Example"
                            id={`example-${index}`}
                            index={index}
                            name={`example-${index}`}
                            placeholder="Enter example"
                            value={exampleList[index]}
                            onChange={onChange}
                            onClick={onClick}
                            key={index}
                        />

                    </div>
                ))
            }
        </div>
    )
}
SourceExampleList.propTypes = {
    exampleList: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default SourceExampleList;