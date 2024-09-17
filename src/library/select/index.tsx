import { StyledOption, StyledSelect } from "./styled";

interface ISelectProps {
  options: any[];
  selected: string;
  onChange: any;
  name: string;
}

const Select: React.FC<ISelectProps> = ({
  options,
  selected,
  name,
  onChange,
}) => {
  return (
    <StyledSelect name={name} onChange={onChange}>
      {options?.map((option, key) => (
        <StyledOption
          key={`${option.value}-${key}`}
          disabled={option.disabled ? true : false}
          selected={selected === option.value ? true : false}
          value={option.value}
        >
          {option?.title}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default Select;
