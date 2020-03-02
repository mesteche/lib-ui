import React, { useState } from 'react'

import { Trash } from 'styled-icons/boxicons-solid/Trash'
import { Check } from 'styled-icons/material/Check'
import Divider from '@material-ui/core/Divider'

import DateRange from '../../Molecules/DateRange'
import Trans, { useTranslation } from '../../Atoms/Trans'
import FormControl, { InputLabel } from '../../Molecules/FormControl'
import Input from '../../Atoms/Input'
import Select from '../../Atoms/Select'
import FlexBox from '../../Templates/FlexBox'

const Action = props => <FlexBox
  css={{ cursor: 'pointer' }}
  fontSize="fontSize"
  fontFamily="fontFamily"
  component="button"
  alignItems="center"
  border="none"
  color="grey.600"
  bgcolor="white"
  gap={0.5}
  p={1}
  {...props}
/>

const Filter = ({
  type,
  translationKey,
  setValue = () => {},
  onChange,
  value,
  ...props
}) => {
  return (
    type === 'date' ? (
      <DateRange
        value={value}
        onChange={setValue}
        onBlur={onChange}
        {...props}
      />
    ) : (
      <FormControl>
        <InputLabel>
          {translationKey}
          <InnerInput
            value={value}
            onChange={setValue}
            onBlur={onChange}
            type={type}
            {...props}
          />
        </InputLabel>
      </FormControl>
    )
  )
}

const InnerInput = ({
  type = 'text',
  onChange,
  value,
  placeholder = '',
  options = [],
  ...props
}) => {
  const t = useTranslation()

  return type === 'select' ? (
    <Select
      onChange={event => onChange(event.target.value)}
      value={value}
      Empty={() => null}
      {...props}
    >
      {options.map(({ value, label }) => <option value={value}>{t(label)}</option>)}
    </Select>
  ) : (
    <Input
      placeholder={t(placeholder)}
      onChange={event => onChange(event.target.value)}
      value={value}
      {...props}
    />
  )
}

const FilterWrapper = ({
  children,
  onClear,
  value: valueProp,
  onChange: onChangeProp = () => {},
  ...props
}) => {
  const [value, setValue] = useState(valueProp)
  const onChange = () => value !== valueProp && onChangeProp(value)

  return (
    <FlexBox
      onKeyPress={ev => ev.key === 'Enter' && onChange()}
      minWidth="200px"
      flexDirection="column"
    >
      <FlexBox p={2} flexDirection="column">
        <Filter value={value} setValue={setValue} onChange={onChange} {...props}/>
      </FlexBox>
      <Divider />
      <FlexBox gap={1} p={1} justifyContent="space-between">
        <Action onClick={onClear}>
          <Trash size={16} />
          <span><Trans>global.action.remove</Trans></span>
        </Action>
        <Action onClick={onChange}>
          <Check size={16} />
        </Action>
      </FlexBox>
    </FlexBox>
  )
}

export default FilterWrapper
