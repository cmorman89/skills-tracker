
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useState } from 'react';

const EditTextWithButton = ({ buttonDeleteIcon, buttonEditIcon, buttonSaveIcon, id, index, name = id, onClick, onChange, placeholder, value, }) => {

  const [editable, setEditable] = useState(false);

  const toggleEditable = () => {
    editable ? setEditable(false) : setEditable(true);
  }


  return (
    <div className="flex flex-grow w-full flex-nowrap mb-2">
      {
        editable ? (
          <input
            autoComplete="off"
            type="text"
            id={id}
            name={name}
            className="mr-2 block lb-2 w-full p-2 border border-slate-600 rounded-md shadow-lg bg-slate-950/80"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value, index)}
          />
        ) : (
          <div className="mr-2 block lb-2 w-full p-2 border border-slate-600/60 rounded-md shadow-lg bg-slate-800/80">
            {value}
          </div>
        )
      }

      <div>
        {
          editable ?
            (
              <div
                className="mr-2 flex justify-center items-center h-10 w-10 p-2 border border-teal-500/50 rounded-md shadow-lg bg-teal-500/20"
                onClick={() => toggleEditable()}
                title="Save"
                role="button"
              >
                <FontAwesomeIcon icon={buttonSaveIcon} />
              </div>
            )
            :
            (

              <div
                className="mr-2 flex justify-center items-center h-10 w-10 p-2 border border-amber-500/70 rounded-md shadow-lg bg-amber-500/40"
                onClick={() => toggleEditable()}
                title="Edit"
                role="button"
              >
                <FontAwesomeIcon icon={buttonEditIcon} />
              </div>
            )
        }
      </div>
      <div
        className="flex justify-center items-center h-10 w-10 p-2 border border-pink-600/50 rounded-md shadow-lg bg-pink-600/30"
        onClick={() => onClick(index)}
        title="Remove"
        role="button"
      >
        <FontAwesomeIcon icon={buttonDeleteIcon} />
      </div>
    </div >
  );
};


export default EditTextWithButton;