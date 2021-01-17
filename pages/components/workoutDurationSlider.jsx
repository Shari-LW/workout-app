import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { duration, InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export default function WorkoutDurationSlider({
  classes,
  name,
  label,
  onChange,
  defaultValue
}) {
  const marks = [
    { value: 0, label: "0" },
    { value: 33, label: "15" },
    { value: 66, label: "30" },
    { value: 100, label: "45" },
  ];

  function valuetext(value) {
    return `${value} minutes`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
    let i = marks.findIndex((mark) => mark.value === value);
    return marks[i].label;
  }

  return (
    <div>
      <InputLabel>{label ? label : "Duration (mins)"}</InputLabel>
      <Slider
        defaultValue={defaultValue}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        valueLabelDisplay="on"
        marks={marks}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
