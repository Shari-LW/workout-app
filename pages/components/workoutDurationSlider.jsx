import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { duration, InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export default function WorkoutDurationSlider({
  classes,
  name,
  label,
  onChange,
  defaultValue,
  marks,
}) {
  function valuetext(value) {
    return `${value} minutes`;
  }

  return (
    <div>
      {/* <InputLabel>{label ? label : "Duration (minutes):"}</InputLabel> */}
      <Slider
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="off"
        marks={marks}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
