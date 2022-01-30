import React from "react";
import PropTypes from "prop-types";

const Button = ({ children, type, version, isDisabled }) => {
    return (
        <button type={type} className={`btn btn-${version}`} disabled={isDisabled}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    version: "primary",
    type: "button",
    isDisabled: false,
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    version: PropTypes.string,
    isDisabled: PropTypes.bool,
};

export default Button;
