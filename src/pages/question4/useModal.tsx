import { Button } from 'antd'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './modal.less'

type Props = {
  children: React.ReactChild
  closeModal: () => void
  width: string
  height: string
}

const Modal = React.memo(({ children, closeModal, width, height }: Props) => {
  const domElement = document.getElementById('root')

  if (!domElement) return null
  return ReactDOM.createPortal(
    <div className="mask">
      <div className="modal" style={{ width, height }}>
      {children}
      <Button onClick={closeModal}>关闭</Button>
    </div>
    </div>,
    domElement
  )
})

interface IProps {
  width: number,
  height: number
}

const useModal = (props: IProps) => {
  const [visible, setVisible] = useState(false) 

  const show = () => setVisible(true)
  const hide = () => setVisible(false)

  // 一个简单的函数组件，children就是弹窗内容
  const RenderModal = ({ children }: { children: React.ReactChild }): React.ReactElement => {
    return (
      <React.Fragment>
        { visible && 
          <Modal 
            closeModal={hide}
            width={`${props.width || 400}px`}
            height={`${props.height || 250}px`}
          >
            {children}
          </Modal>
        }
      </React.Fragment>
    )
  }

  return {
    show,
    hide,
    RenderModal
  }
}

export { useModal }