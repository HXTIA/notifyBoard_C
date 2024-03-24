import { View } from '@tarojs/components'
import { Input } from '@taroify/core'
import React, { FC, useCallback, useContext, useState } from 'react'
import useUpdateEffect from 'src/hooks/useUpdateEffect'
import { TStateHookUpdateFn } from '../../types'
import { IndexContextProvider } from '../../common'
import './search.module.scss'

const Index: FC<{
  setSearchText: TStateHookUpdateFn<string>
  setPage: TStateHookUpdateFn<number>
}> = ({ setSearchText, setPage }) => {
  const { requestFn, updateList, searchText, filterType } = useContext(IndexContextProvider)
  /** 搜索文案 */
  const [text, setText] = useState('')
  /** 搜索逻辑 */
  const searchBtn = useCallback(() => {
    /** TODO: 或许可以优化下这个逻辑 + 从未输入时的空数据不发请求 */
    setPage(0)
    requestFn!({ page: 0, searchText: text }).then((res) => {
      res && updateList!([...(res || [])])
    })
    setSearchText(text)
  }, [requestFn, setPage, setSearchText, text, updateList])

  useUpdateEffect(() => {
    setText('')
    setSearchText('')
  }, [filterType])

  /** 更新搜索框文字 */
  const updateText = useCallback(
    (e) => {
      const currentText = e.detail.value as string
      setText(currentText)
      /** 如果搜索框的值和index的不一样进行更新 */
      if (currentText !== searchText) {
        setSearchText(currentText)
      }
    },
    [searchText, setSearchText],
  )

  return (
    <View className='search_wrapper'>
      <Input
        placeholder='输入点什么...'
        className='input'
        value={text}
        /** 每200ms合并一次 */
        onChange={debounce(updateText, 200)}
      />
      <View className='button' onClick={searchBtn}>
        搜索
      </View>
    </View>
  )
}

export default React.memo<{
  setSearchText: TStateHookUpdateFn<string>
  setPage: TStateHookUpdateFn<number>
}>(Index)

function debounce(func, delay) {
  let timer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
