import { Button, View } from '@tarojs/components'
import React, { useCallback, useMemo, useState } from 'react'
import { URL, goTo, query } from 'src/utils'
import { Cell, Field, Input } from '@taroify/core'
import InputMenu from 'src/components/common/InputMenu'
import './org.module.scss'

const Index = () => {
  const goToPage = useCallback(() => {
    goTo({
      url: URL.Initial,
      methodType: 'redirectTo',
      extraParams: {
        ...query(),
      },
      options: {
        authorize: false,
      },
    })
  }, [])
  // const [value, setValue] = useState('')
  // console.log('value', value)

  return (
    <View className='OrgContainer'>
      <View className='OrgContainer__bgContainer'>
        <View className='OrgContainer__welcome'>欢迎使用作业板~</View>
        <View className='OrgContainer__headline'>赶紧加入一个组织吧！</View>
        <View className='OrgContainer__describe'>我们等你很久了</View>
      </View>
      {/* <Cell.Group inset className='Field__bgContainer '>
        <Field label='文本 |' className='Field__bgContainer'>
          <Input
            placeholder='请输入文本'
            value={value}
            onChange={(e) => setValue(e.detail.value)}
          />
        </Field>
      </Cell.Group> */}
      <InputMenu></InputMenu>
      <Button className='OrgContainer__button' onClick={goToPage}>
        下一步
      </Button>
    </View>
  )
}

export default React.memo(Index)
