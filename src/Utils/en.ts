import { NotifierTitle, ResetPasswordWorkingState } from './enums'

const notFound = {
  title: 'ERROR 404!',
  subTitle: 'OPPS! PAGE NOT FOUND',
  detail: 'Sorry, the page you are looking for does not exist. If you think something is broken report a problem.',
  redirection: {
    url: '/',
    displayName: 'RETURN HOME'
  },
  problemUrl: {
    url: '/',
    displayName: 'REPORT PROBLEM'
  }
}

const labels = {
  [ResetPasswordWorkingState.FORGOT]: {
    title: 'FORGOT PASSWORD',
    text: 'Please enter your email address to continue.'
  },
  [ResetPasswordWorkingState.OTP]: {
    title: 'ENTER OTP',
    text: 'Please enter otp sent to '
  },
  [ResetPasswordWorkingState.CHANGE]: {
    title: 'CHANGE PASSWORD',
    text: 'Please enter new and confirm password.'
  },
  profile:{
    passwordStrength: {
      strong: 'strong',
      medium: 'medium',
      enough: 'enough'
    }
  }
}

const error_messages = {
  generic: {
    message: 'Something went wrong',
    description: 'Internal Server Error',
  },
  default: {
    message: 'Failed - ~~~',
    description: 'Could not ~~~ at the moment'
  },
  invalid_user: {
    message: 'Invalid User',
    description: 'Please login to continue.'
  },
  invalid_content_image: {
    message: 'Invalid Image',
    description: 'The uploaded is not a fit for the selected ratio.'
  },
  warn_content_image: {
    message: 'Warning Aspect Ratio doesn\'t Match!',
    description: 'The uploaded image may not be visible completely.'
  },
  warn_invalid_start_date: {
    message: 'Invalid start date selected',

  }

}

const success_messages = {
  [NotifierTitle.LOGIN]: { message: 'Logged in Successfully.', description: 'You have been logged in.' },
  [NotifierTitle.CHANGE_PASSWORD]: { message: 'Password Changed Successfully.', description: 'Your password has been changed.' },
  [NotifierTitle.SEND_EMAIL]: { message: 'Email sent Successfully.', description: 'Email has been sent to the provided mail address.' },
  [NotifierTitle.RESET_PASSWORD]: { message: 'Password reset Successfully.', description: 'Password has been reset. Please login to continue' },
  [NotifierTitle.ORGANIZATION_LIST]: { message: 'Organization listed Successfully.', description: 'Organization list has been fetched.' },
  [NotifierTitle.ORGANIZATION_ADD]: { message: 'Organization added Successfully.', description: 'New Organization has been added.' },
  [NotifierTitle.ORGANIZATION_UPDATE]: { message: 'Organization updated Successfully.', description: 'Organization has been updated.' },
  [NotifierTitle.ORGANIZATION_DELETE]: { message: 'Organization deleted Successfully.', description: 'Organization has been removed.' },
  [NotifierTitle.ORGANIZATION_ENABLE]: { message: 'Organization enabled Successfully.', description: 'Organization has been enabled.' },
  [NotifierTitle.ORGANIZATION_DISABLE]: { message: 'Organization disabled Successfully.', description: 'Organization has been disabled.' },
  [NotifierTitle.AD_CONTENT_LIST]: { message: 'Ad content listed Successfully.', description: 'Ad content list has been fetched.' },
  [NotifierTitle.AD_CONTENT_ADD]: { message: 'Ad content added Successfully.', description: 'New Ad content has been added.' },
  [NotifierTitle.AD_CONTENT_UPDATE]: { message: 'Ad content updated Successfully.', description: 'Ad content has been updated.' },
  [NotifierTitle.AD_CONTENT_DELETE]: { message: 'Ad content deleted Successfully.', description: 'Ad content has been removed.' },
  [NotifierTitle.PORTAL_LIST]: { message: 'Portal listed Successfully.', description: 'Portal list has been fetched.' },
  [NotifierTitle.PORTAL_ADD]: { message: 'Portal added Successfully.', description: 'New Portal has been added.' },
  [NotifierTitle.PORTAL_UPDATE]: { message: 'Portal updated Successfully.', description: 'Portal has been updated.' },
  [NotifierTitle.PORTAL_DELETE]: { message: 'Portal deleted Successfully.', description: 'Portal has been removed.' },
  [NotifierTitle.PORTAL_ENABLE]: { message: 'Portal enabled Successfully.', description: 'Portal has been enabled.' },
  [NotifierTitle.PORTAL_DISABLE]: { message: 'Portal disabled Successfully.', description: 'Portal has been disabled.' },
  [NotifierTitle.USER_LIST]: { message: 'User listed Successfully.', description: 'User list has been fetched.' },
  [NotifierTitle.USER_ADD]: { message: 'User added Successfully.', description: 'New User has been added.' },
  [NotifierTitle.USER_UPDATE]: { message: 'User updated Successfully.', description: 'User has been updated.' },
  [NotifierTitle.USER_DELETE]: { message: 'User deleted Successfully.', description: 'User has been removed.' },
  [NotifierTitle.USER_ENABLE]: { message: 'User enabled Successfully.', description: 'User has been enabled.' },
  [NotifierTitle.USER_DISABLE]: { message: 'User disabled Successfully.', description: 'User has been disabled.' },
  [NotifierTitle.LOG_OUT]: { message: 'Logged out Successfully.', description: 'You have been logged out successfully.' },
  [NotifierTitle.BLOCK_LIST]: { message: 'Block listed Successfully.', description: 'Block list has been fetched.' },
  [NotifierTitle.BLOCK_ADD]: { message: 'Block added Successfully.', description: 'New Block has been added.' },
  [NotifierTitle.BLOCK_UPDATE]: { message: 'Block updated Successfully.', description: 'Block has been updated.' },
  [NotifierTitle.BLOCK_DELETE]: { message: 'Block deleted Successfully.', description: 'Block has been removed.' },
  [NotifierTitle.SECTION_LIST]: { message: 'Section listed Successfully.', description: 'Section list has been fetched.' },
  [NotifierTitle.SECTION_ADD]: { message: 'Section added Successfully.', description: 'New Section has been added.' },
  [NotifierTitle.SECTION_UPDATE]: { message: 'Section updated Successfully.', description: 'Section has been updated.' },
  [NotifierTitle.SECTION_DELETE]: { message: 'Section deleted Successfully.', description: 'Section has been removed.' },
  [NotifierTitle.MAP_AD_TO_SECTION]: { message: 'Ad mapped Successfully to section.', description: 'Ad content has been mapped to section.' },
  [NotifierTitle.ADVERTISEMENT_LIST]: { message: 'Advertisement listed Successfully.', description: 'Advertisement list has been fetched.' },
  [NotifierTitle.ADVERTISEMENT_UPDATE]: { message: 'Advertisement updated Successfully.', description: 'Advertisement has been updated.' },
  [NotifierTitle.ADVERTISEMENT_DELETE]: { message: 'Advertisement deleted Successfully.', description: 'Provided Advertisement has been deleted.' },
  [NotifierTitle.ADVERTISEMENT_TERMINATE]: { message: 'Advertisement terminated Successfully.', description: 'Provided Advertisement has been terminated.' },
  [NotifierTitle.ADVERTISEMENT_SCREENSHOT_UPDATE]: { message: 'Screenshot updated Successfully.', description: 'Screenshot has been replaced with the provided one.' },
  [NotifierTitle.CONTRACT_LIST]: { message: 'Contract listed Successfully.', description: 'Contract list has been fetched.' },
  [NotifierTitle.CONTRACT_UPDATE]: { message: 'Contract updated Successfully.', description: 'Contract has been updated.' },
  [NotifierTitle.CONTRACT_DELETE]: { message: 'Contract deleted Successfully.', description: 'Provided Contract has been deleted.' },
  [NotifierTitle.COPY_PORTAL_ID]: { message: 'Copied Successfully', description: 'Portal Id copied to clipboard.' }
}

export { notFound, labels, error_messages, success_messages }
