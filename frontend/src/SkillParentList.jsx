import { useEffect } from "react";
import TextWithPlus from "./TextWithPlus";
import PropTypes from 'prop-types';

const SkillParentList = ({ Component = TextWithPlus, onClick, skillList}) => {

    // Rerender the component with the available parents when the available parents change
    useEffect(() => {
        console.log("Available parents changed: ", skillList);
    }, [skillList]);


    return (
        <div className='flex flex-row flex-wrap flex-grow text-slate-300 mb-4 items-center justify-center'>
            {
                skillList.map(parent => (
                    <Component
                        skill={parent}
                        key={parent.id}
                        text={parent.name}
                        onClick={onClick}
                        className='flex text-center items-center justify-center h-16 w-16 m-1 bg-teal-200/50 rounded-full'
                    />
                ))
            }
        </div>
    )
};
SkillParentList.propTypes = {
    Component: PropTypes.elementType,
    onClick: PropTypes.func.isRequired,
    skillList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
};

export default SkillParentList;