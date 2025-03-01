import PropTypes from 'prop-types';

const MainContent = ({ innerComponent, pageTitle }) => {


    return (

        <div className="flex flex-col flex-grow bg-neutral-200 p-4">
            <h1 className="pageTitle mb-4">{pageTitle}</h1>
            {
                <div className="mb-4">
                    {innerComponent}
                </div>
            }
        </div >
    )
}

MainContent.propTypes = {
    pageTitle: PropTypes.string,
    innerComponents: PropTypes.object.isRequired,
}
MainContent.defaultProps = {
    pageTitle: "Page Title",
}
export default MainContent;