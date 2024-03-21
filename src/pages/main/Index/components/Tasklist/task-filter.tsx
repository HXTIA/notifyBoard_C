import { View, Text } from '@tarojs/components'
import React, { useState, Key, useContext, useEffect } from 'react'
import { Descending } from '@taroify/icons'
import { DropdownMenu } from '@taroify/core'
import { TFilterType } from '../../types'
import { IndexContextProvider } from '../../common'
import './filter.module.scss'

const Index = ({
  setFilterType,
}: {
  setFilterType: React.Dispatch<React.SetStateAction<TFilterType>>
}) => {
  const { filterType } = useContext(IndexContextProvider)
  const [value, setValue] = useState<Key | false>()

  /** 更新筛选类型 */
  const changeFilterType = (val: TFilterType) => {
    /* __PURE__ */ console.log(' === 更新筛选类型 === ', val)
    setFilterType(val)
  }

  /** 匹配文字 */
  const mapFilterTypeText = (val: TFilterType) => {
    const map = {
      all: '全部',
      un_expired: '未完成',
      resolve: '已完成',
      timeout: '已过期',
    }
    return map[val]
  }

  return (
    <View className='filterIcon_wrapper'>
      <View>
        <Text className='text'>当前查看类型：</Text>
        <Text className='text bold'>{mapFilterTypeText(filterType || 'all')}</Text>
      </View>
      <DropdownMenu value={value} onChange={setValue}>
        <DropdownMenu.Item
          title={<Descending size={30} style={{ height: '40rpx' }} />}
          onChange={changeFilterType}
          value={filterType}
          style={{ background: 'transparent' }}
        >
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            请选择你想查看的筛选类型
          </View>
          <DropdownMenu.Option value='all'>全部</DropdownMenu.Option>
          <DropdownMenu.Option value='un_expired'>未完成</DropdownMenu.Option>
          <DropdownMenu.Option value='resolve'>已完成</DropdownMenu.Option>
          <DropdownMenu.Option value='timeout'>已过期</DropdownMenu.Option>
        </DropdownMenu.Item>
      </DropdownMenu>
    </View>
  )
}

export default React.memo(Index)
