import PropTypes from 'prop-types';

const MainContent = ({ children, pageTitle }) => {


    return (

        <div className="flex flex-col flex-grow bg-gradient-to-b from-neutral-200 to-fuchsia-100 p-8">
            <h1 className="pageTitle mb-4">{pageTitle}</h1>
            {
                <div className="mb-4">
                    {children}
                </div>
            }
        </div >
    )
}

MainContent.propTypes = {
    children: PropTypes.node.isRequired,
    pageTitle: PropTypes.string,
}
MainContent.defaultProps = {
    pageTitle: "Page Title",
}
export default MainContent;