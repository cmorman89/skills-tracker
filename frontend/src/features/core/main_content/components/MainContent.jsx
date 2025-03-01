import PropTypes from 'prop-types';

const MainContent = ({ innerComponents }) => {


    return (

        <div className="flex flex-col flex-grow bg-fuchsia-300/15 rounded-xl shadow-2xl border border-fuchsia-700/60 p-4">

            {
                innerComponents.map((component, key) => (
                    <div key={key} className="mb-4">
                        {component}
                    </div>
                ))
            }
        </div >
    )
}

MainContent.propTypes = {
    innerComponents: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired,
    setMessageType: PropTypes.func.isRequired,
    setMessageVisible: PropTypes.func.isRequired,
}
export default MainContent;