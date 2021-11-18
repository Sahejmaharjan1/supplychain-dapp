import { notification } from 'antd'
import { error_messages, success_messages } from '../en'
import { NotifierTitle } from '../enums'
import { generateErrorMessage } from '../utilFunctions'

const success = (title: NotifierTitle, description?: string): void => {
  notification.success({
    message: success_messages[title].message,
    description: description || success_messages[title].description,
    placement: 'bottomRight',
  })
}

const error = (title: NotifierTitle, description?: string): void => {
  notification.error({ ...generateErrorMessage(title, description), placement: 'bottomRight', })
}

const generic = (): void => {
  notification.error({
    message: error_messages.generic.message,
    description: error_messages.generic.description,
    placement: 'bottomRight',
  })
}
const invalidUser = (): void => {
  notification.error({
    message: error_messages.invalid_user.message,
    description: error_messages.invalid_user.description,
    placement: 'bottomRight',
  })
}

const contentImage = {
  invalid: (): void => {notification.error({ message: error_messages.invalid_content_image.message, description: error_messages.invalid_content_image.description, placement: 'bottomRight', })},
  warn: (): void => {notification.warning({ message: error_messages.warn_content_image.message, description: error_messages.warn_content_image.description, placement: 'bottomRight', })},
}

const notifier = {
  error,
  generic,
  success,
  invalidUser,
  contentImage,
}

export { notifier }
