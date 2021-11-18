import { NotifierTitle, Orientation } from './enums'
import { error_messages } from './en'
import { AspectRatioDetail, ErrorObject, Nullable } from './types'
import moment, { Moment } from 'moment'
import { FieldTypeSectionMain } from '../Redux/Section/Types'

export const generateErrorMessage = (title: NotifierTitle, description?: string): ErrorObject => ({
  message: error_messages.default.message.replace('~~~', title),
  description: description || error_messages.default.description.replace('~~~', title)
})

export const getImageWidthHeight = (file: File): Promise<AspectRatioDetail | ErrorObject> => {
  return new Promise((resolve, reject) => {
    if(!file || !file.type || file.type.toLowerCase().search('image') === -1){
      reject({ message: 'File Error', description: 'File not found or invalid.' } as ErrorObject)
    }
    const fileReader = new FileReader()
    fileReader.onload = e => {
      const src = e?.target?.result
      const image = new Image()
      image.onload = () => {
        const { width, height } = image
        resolve({ width, height, minPreferredSize: `${width}px * ${height}px`,  ratio: getAspectRatio(width, height), orientation: getOrientation(width, height) })
      }
      image.onerror = () => reject({ message: 'Fetching error', description: 'Error getting image details' } as ErrorObject)
      image.src = src as string
    }
    fileReader.readAsDataURL(file)
  })
}

export const getOrientation = (width: number, height: number): Orientation => width > height ? Orientation.LANDSCAPE : width < height ? Orientation.PORTRAIT : Orientation.SQUARE

const gcd =  (a, b) => b == 0 ? a : gcd (b, a % b)

export const getAspectRatio = (width: number, height: number): string => {
  const val = gcd(width, height)
  return `${width / val} : ${height/val}`
}

export const getDivision =
    (width: number, height: number): number =>
      getOrientation(width, height) === Orientation.LANDSCAPE ? width / height : height / width

export const disableDate =
    (current: Moment): boolean =>
      current && current < moment().subtract(1, 'days').endOf('day')

export const getRange = (start: number, end: number): number[] => {
  const result:number[] = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}

export const getUsedWrapperSections =
    (blockId: string, sectionList: Nullable<FieldTypeSectionMain[]>): number => {
      const temp:string[] = []
      return sectionList ? sectionList.reduce((acc, curr) => {
        if (curr?.block?.id === blockId && temp.findIndex(t => t === curr?.wrapperSectionKey) === -1) {
          temp.push(curr?.wrapperSectionKey)
          acc += 1
        }
        return acc
      }, 0) : 0
    }

export const getLastOrder =
    (blockId: string, sectionList: Nullable<FieldTypeSectionMain[]>): number =>
      sectionList && sectionList.filter(sl => sl.block.id === blockId).length > 0
        ? sectionList.reduce((acc, curr) => curr.block.id === blockId && curr.sectionOrder > acc ? curr.sectionOrder : acc , 0) + 1
        : 1
