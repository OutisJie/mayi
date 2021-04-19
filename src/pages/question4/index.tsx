import { Button } from "antd"
import React, { FC } from "react"
import { useModal } from "./useModal"

const Q4: FC = () => {
  const { show, hide, RenderModal } = useModal({
    width: 400,
    height: 200,
  })

  return (
    <div>
      <div>
        <Button onClick={show}>打开弹窗</Button>
        <Button onClick={hide}>关闭弹窗</Button>
        <RenderModal>
          <div>弹框内需要展示的内容, 会被渲染到 root 容器里</div>
        </RenderModal>
      </div>
      <div id="modal-root" />
    </div>
  )
}

export default Q4
