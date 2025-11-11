import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icons from '../Icons';
import { colors } from '@/features/system/theme/configs/colors';
import Typography from '../Typography';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  width?: number;
  height?: number;
  color?: string;
  isDisable?: boolean;
  colorDisable?: string;
  children?: any;
}

const Checkbox: React.FC<CheckboxProps> = props => {
  const { label, checked, onChange, isDisable, color, children } = props;
  const [isChecked, setIsChecked] = useState(checked);
  const { CheckBoxIcon } = Icons;

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const colorUpdate = isDisable ? colors.text.stTropaz : color;

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
      disabled={isDisable}
      onPress={handleToggle}>
      <CheckBoxIcon color={colorUpdate} color2={isChecked ? colorUpdate : 'transparent'} />
      {children ? children : <Typography color={'gray'}>{label}</Typography>}
    </TouchableOpacity>
  );
};

export default Checkbox;
