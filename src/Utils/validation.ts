import { labels } from './en'
import { notifier } from './Notifiers/Notifier'
import { getDivision, getOrientation } from './utilFunctions'
import { FieldTypePortalMain } from '../Redux/Portal/Types'

const { strong, medium, enough } = labels.profile.passwordStrength

const passwordStrength = {
  [strong]: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})',
  [medium]: '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
  [enough]: `'(?=.{6,}).*', 'g'`
}

export const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

type validatePasswordReturnValues = undefined | keyof typeof passwordStrength

export const validatePassword = (password: string): validatePasswordReturnValues => {
  if (!password) {
    return
  }
  return (Object.keys(passwordStrength) as  Array<keyof typeof passwordStrength>).find(k => {
    return (new RegExp(passwordStrength[k])).test(password)
  })
}

export const validatePortalId = (portalId: string, portalList: FieldTypePortalMain[]): boolean => {
  return portalList ? portalList?.findIndex(pl => pl?.id === portalId) !== -1 : false
}

export const validateContentImage = (cWidth: number, cHeight: number, rWidth: number, rHeight: number): boolean => {
  if(getOrientation(cWidth, cHeight) !== getOrientation(rWidth, rHeight)){
    notifier.contentImage.invalid()
    return false
  }
  if(getDivision(rWidth, rHeight) - getDivision(cWidth, cHeight) > 0.20 || getDivision(rWidth, rHeight) - getDivision(cWidth, cHeight) < -0.20){
    notifier.contentImage.warn()
  }
  return true
}

export const validateURL = (url: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i') // fragment locator
  return pattern.test(url)
}
