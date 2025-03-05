import PropTypes from 'prop-types';

const MainContent = ({ innerComponent, pageTitle }) => {


    return (

        <div className="flex flex-col flex-grow bg-gradient-to-b from-neutral-200 to-fuchsia-100 p-8">
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
    innerComponent: PropTypes.object.isRequired,
}
MainContent.defaultProps = {
    pageTitle: "Page Title",
}
export default MainContent;