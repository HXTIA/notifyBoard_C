import { View, Text } from '@tarojs/components'
import React from 'react'
import { Delete, Put, URL, goTo, subscribeHOF, timeFormat } from 'src/utils'
import { SwipeCell } from '@taroify/core'
import { TGeneralObject } from 'src/types'
import type { SwipeCellProps } from '@taroify/core/swipe-cell/swipe-cell'
import {
  ArrowDown as ArrowDownIcon,
  Delete as DeleteIcon,
  Replay as ReplayIcon,
  Exchange as ExchangeIcon,
} from '@taroify/icons'
import { TPropsThrough, TTaskItem } from '../../types'
import { IndexContextProvider, TASK_STATUS, taskInterUrl, tplIds } from '../../common'
import './item.module.scss'

/** 任务状态枚举 */
/** TODO: 根据状态吗需要排序 */
const statusMap: {
  [key in number]: {
    text: string
    color: string
    btnFnText: string
    action: 'delete' | 'resolve' | 'reopen'
  }
} = {
  [TASK_STATUS.UN_EXPIRED]: {
    text: '进行中',
    color: 'green',
    /** 左滑功能按钮文案 */
    btnFnText: '完成',
    /** 需要完成的动作 */
    action: 'resolve',
  },
  [TASK_STATUS.CRITICALITY]: {
    text: '即将过期',
    color: 'orange',
    /** 左滑功能按钮文案 */
    btnFnText: '完成',
    /** 需要完成的动作 */
    action: 'resolve',
  },
  [TASK_STATUS.EXPIRED]: {
    text: '过期',
    color: 'red',
    /** 左滑功能按钮文案 */
    btnFnText: '重启',
    /** 需要完成的动作 */
    action: 'reopen',
  },
  [TASK_STATUS.RESOLVED]: {
    text: '已完成',
    color: 'aqua',
    /** 左滑功能按钮文案 */
    btnFnText: '重启',
    /** 需要完成的动作 */
    action: 'reopen',
  },
}

const formatDesc = (str: string) => (str.length > 30 ? str.substring(0, 30) : str)
/** Props类型限制 */
type TTaskItemProps = {
  /** 渲染细则 */
  taskInfo: TTaskItem
  /** 父传子触发事件 */
  handleEvents: (events: 'delete' | 'resolve' | 'reopen', taskinfo: TTaskItem) => void
}

/** state类型限制 */
type TTaskItemState = {
  /** 状态的样式 */
  statusStyle: TGeneralObject
  /** 状态的文字 */
  statusText: string
  /** 左滑功能按钮文字 */
  btnFnText: string
  /** 需要完成的动作 */
  action: 'delete' | 'resolve' | 'reopen'
  /** swiperCell open状态 */
  openDire: SwipeCellProps['open']
}

class Index extends React.PureComponent<TTaskItemProps, TTaskItemState> {
  // eslint-disable-next-line react/sort-comp
  static contextType?: React.Context<TPropsThrough> =
    IndexContextProvider /** 接收祖先组件的context透传 */
  context!: React.ContextType<typeof IndexContextProvider>

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: TTaskItemProps) {
    /** 初始化props */
    super(props)
    /** 绑定this指向 */
    this.goToDetail = this.goToDetail.bind(this)
    /** 内部state */
    this.state = {
      statusStyle: {},
      statusText: '',
      btnFnText: '',
      action: '' as 'delete' | 'resolve' | 'reopen',
      openDire: 'outside',
    }
  }

  /** 挂载 */
  componentDidMount(): void {
    /** 匹配状态 */
    this.matchStatus()
  }
  /** 卸载 */
  componentWillUnmount(): void {}

  /**匹配状态 */
  matchStatus = () => {
    const { status } = this.props.taskInfo
    const res = statusMap[status]
    this.setState({
      statusText: res.text,
      statusStyle: {
        backgroundColor: res.color,
      },
      btnFnText: res.btnFnText,
      action: res.action,
    })
  }

  /** 跳转到详情页面 */
  @subscribeHOF(tplIds)
  goToDetail() {
    console.log(' === 点击卡片，详情页开始跳转 === ')
    goTo({ url: URL.Detail, methodType: 'navigateTo', extraParams: { id: this.props.taskInfo.id } })
  }

  /** 删除任务 */
  deleteTask = async () => {
    const { id } = this.props.taskInfo
    const res = await Delete({
      url: taskInterUrl,
      data: {
        id,
      },
      loadingNeedMask: false,
    })
    if (res.isSuccess && !res.code) {
      console.log(' === 删除任务 === ', this.props.taskInfo)
      this.props.handleEvents('delete', this.props.taskInfo)
    }
  }

  /** 完成、重启函数 */
  resolveOrReopen = async () => {
    const { id } = this.props.taskInfo
    const { action } = this.state
    const res = await Put({
      url: taskInterUrl,
      data: {
        id,
        action,
        /** 若还需要别的做个判断加个按需即可 */
      },
      loadingNeedMask: false,
    })
    console.log('success', res.isSuccess)

    if (res.isSuccess && !res.code) {
      console.log(' === 重启、完成任务 === ', this.props.taskInfo)
      this.props.handleEvents(action, this.props.taskInfo)
    }
  }

  open = () => {
    let openDire = this.state.openDire
    openDire = openDire === 'outside' ? 'right' : 'outside'
    this.setState({
      openDire,
    })
  }

  render() {
    const { time, title, desc } = this.props.taskInfo
    const { openDire } = this.state
    return (
      <SwipeCell
        className='custom-swipe-cell'
        open={openDire}
        /** 为了兼容滑动和点击箭头导致的open状态不匹配情况 */
        onOpen={() => this.setState({ openDire: 'right' })}
        onClose={() => this.setState({ openDire: 'outside' })}
      >
        <View className='custom-card'>
          <View className='left' onClick={this.goToDetail}>
            <Text className='left_title'>{title}</Text>
            <Text className='left_time'>
              截止日期：{timeFormat(time, 'YYYY年MM月DD日 hh:mm:ss')}
            </Text>
            <Text className='left_desc'>简介：{formatDesc(desc)}</Text>
          </View>
          <View className='right'>
            <View className='right_tools'>
              {/* TODO: 箭头处理 */}
              <ArrowDownIcon onClick={this.open} />
            </View>
            <View className='right_status' style={this.state.statusStyle}>
              {/* 状态文字提示 */}
              {this.state.statusText}
            </View>
          </View>
        </View>
        <SwipeCell.Actions side='right'>
          <View className='opera_area'>
            <View className='opera_area_del' onClick={this.deleteTask}>
              <DeleteIcon size={40} />
              删除
            </View>
            <View className='opera_area_dynamicStatus' onClick={this.resolveOrReopen}>
              {this.state.action === 'resolve' ? (
                <ExchangeIcon size={40} />
              ) : (
                <ReplayIcon size={40} />
              )}
              {this.state.btnFnText}
            </View>
          </View>
        </SwipeCell.Actions>
      </SwipeCell>
    )
  }
}

export default Index
