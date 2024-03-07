import { ElNotification } from 'element-plus'

export const success = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'success',
    dangerouslyUseHTMLString: true
  })
}

export const warning = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'warning',
    dangerouslyUseHTMLString: true
  })
}

export const info = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'info',
    dangerouslyUseHTMLString: true
  })
}

export const error = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'error',
    dangerouslyUseHTMLString: true
  })
}
