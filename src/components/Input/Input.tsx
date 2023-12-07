import React, { useState } from 'react'
import { TextInput, View } from 'react-native'
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

type TInputProps = {
  placeholderText?: string
  onInputChange?: (text: string) => void
  secureTextEntry?: boolean
}


const Input: React.FC<TInputProps> = ({placeholderText, onInputChange, secureTextEntry}) => {

  const [inputValue, setInputValue] = useState<string>('')

  const handleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInputValue(e.nativeEvent.text)
    onInputChange && onInputChange(e.nativeEvent.text)
  }

  return (
    <TextInput className="bg-white rounded-xl w-full p-2 m-2" placeholder={placeholderText} value={inputValue} onChange={handleOnChange} secureTextEntry={secureTextEntry}/>
  )
}

export default Input