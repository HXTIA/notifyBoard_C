import React, { useEffect, useState } from 'react'
import { Cell, Field, Input } from '@taroify/core'
import { View } from '@tarojs/components'
import './index.module.scss'

const Index = () => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Boolean>(false)
  console.log('value', value)

  const clickShowMenu = () => {
    setStatus(!status)
  }

  return (
    <Cell.Group inset className='Field__bgContainer '>
      <Field label='文本 |' className='Field__bgContainer'>
        <Input
          placeholder='请输入文本'
          value={value}
          onChange={(e) => setValue(e.detail.value)}
          onClick={() => clickShowMenu()}
        />
      </Field>
      {status ? (
        <View
          className='InputMenu__Container'
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <View className='InputMenu__Container__item' onClick={() => clickShowMenu()}>
            文本1
          </View>
          <View className='InputMenu__Container__item'>文本2</View>
          <View className='InputMenu__Container__item'>文本3</View>
        </View>
      ) : null}
    </Cell.Group>
  )
}

export default React.memo(Index)
