import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Chip from './Chip';

type Props = {
  avialableMetrics: Array<string>;
  handleChange: any;
  selectedMetrics: Array<string>;
};

const Selector = ({ avialableMetrics, handleChange, selectedMetrics }: Props) => {
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        fullWidth
        name="selectedMetrics"
        placeholder="Select Metrics to Display"
        onChange={handleChange}
        // input={<Input id="select-multiple-chip" fullWidth placeholder="Select Metrics to Display" />}
        value={selectedMetrics}
        renderValue={selected => (
          <div>
            {(selected as string[]).map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        {avialableMetrics.map((metric: string) => (
          <MenuItem key={metric} value={metric}>
            {metric}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
