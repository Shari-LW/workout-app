import React from "react";
import PropTypes from "prop-types";
import defer from "../components/Defer";
import Button from "../components/AppButton";

function FormButton(props) {
  const { disabled, mounted, onClick, ...others } = props;
  return (
    <Button
      disabled={!mounted || disabled}
      type="submit"
      variant="contained"
      onClick={onClick}
      {...others}
    />
  );
}

FormButton.propTypes = {
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};

export default defer(FormButton);
