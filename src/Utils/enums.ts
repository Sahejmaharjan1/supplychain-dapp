export enum ScreenSizes {
  MOBILE = 640,
  TABLET = 768,
  LARGE_TABLET = 1024,
  DESKTOP = 1280,
  LARGE_DESKTOP = 1440,
}

export enum ResetPasswordWorkingState{
  FORGOT = 'forgotPassword',
  OTP = 'otp',
  CHANGE = 'changePassword',
}

export enum CustomRoles{
  SUPER_ADMIN = 'super_admin',
  PORTAL_ADMIN = 'portal_admin',
  PORTAL_STAFF = 'portal_staff',
}

export enum AwsAuthState{
  LOADING = 'loading',
  SIGNED_IN = 'signedIn',
  SIGN_IN = 'signIn',
  VERIFY_CONTACT = 'verifyContact',
  INVALID_USER_POOL_TOKEN = 'signedOutUserPoolsTokenInvalid',
}

export enum AwsChangePasswordErrorCode {
  NOT_AUTHORIZE= 'NotAuthorizedException'
}

export enum AwsChallengeName{
  NEW_PASSWORD = 'NEW_PASSWORD_REQUIRED'
}

export enum NotifierTitle{
  GENERIC = 'generic',
  LOGIN = 'login',
  CHANGE_PASSWORD = 'change password',
  SEND_EMAIL = 'send email',
  RESET_PASSWORD = 'reset password',
  ORGANIZATION_LIST = 'list organization',
  ORGANIZATION_ADD = 'add organization',
  ORGANIZATION_UPDATE = 'update organization',
  ORGANIZATION_DELETE = 'delete organization',
  ORGANIZATION_ENABLE = 'enable organization',
  ORGANIZATION_DISABLE = 'disable organization',
  AD_CONTENT_LIST = 'list ad content',
  AD_CONTENT_ADD = 'add ad content',
  AD_CONTENT_UPDATE = 'update ad content',
  AD_CONTENT_DELETE = 'delete ad content',
  PORTAL_LIST = 'list portal',
  PORTAL_ADD = 'add portal',
  PORTAL_UPDATE = 'update portal',
  PORTAL_DELETE = 'delete portal',
  PORTAL_ENABLE = 'enable portal',
  PORTAL_DISABLE = 'disable portal',
  USER_LIST = 'list user',
  USER_ADD = 'add user',
  USER_UPDATE = 'update user',
  USER_DELETE = 'delete user',
  USER_ENABLE = 'enable user',
  USER_DISABLE = 'disable user',
  LOG_OUT = 'Log out',
  BLOCK_LIST = 'list block',
  BLOCK_ADD = 'add block',
  BLOCK_UPDATE = 'update block',
  BLOCK_DELETE = 'delete block',
  SECTION_LIST = 'list section',
  SECTION_ADD = 'add section',
  SECTION_UPDATE = 'update section',
  SECTION_DELETE = 'delete section',
  MAP_AD_TO_SECTION = 'ad mapping to section',
  ADVERTISEMENT_LIST = 'list advertisement',
  ADVERTISEMENT_UPDATE = 'update advertisement',
  ADVERTISEMENT_DELETE = 'delete advertisement',
  ADVERTISEMENT_TERMINATE = 'terminate advertisement',
  ADVERTISEMENT_SCREENSHOT_UPDATE = 'update screenshot',
  CONTRACT_LIST = 'list contract',
  CONTRACT_UPDATE = 'update contract',
  CONTRACT_DELETE = 'delete contract',
  COPY_PORTAL_ID = 'copy portal id',
  USER_INFORMATION = 'user information',
}

export enum OperationStatus{
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export enum PortalSubMenuItems{
  OVERVIEW = 'Overview',
  BLOCK = 'Block',
  SECTION = 'Section'
}

export enum SectionOccupancies{
  FULL = 100,
  HALF = 50,
  THREE_BY_FOUR= 75,
  ONE_BY_FOUR = 25,
  ONE_BY_THREE = 33,
  TWO_BY_THREE = 66,
}

export enum Orientation {
  LANDSCAPE= 'LANDSCAPE',
  PORTRAIT = 'PORTRAIT',
  SQUARE = 'SQUARE',
}

export enum ContractStatus {
  CREATED = 'created',
  ACCEPTED = 'accepted',
  PAID = 'paid',
  EXPIRED = 'expired',
}

export enum AdvertisementStatus {
  CREATED = 'created',
  READY = 'ready',
  BLOCKED = 'blocked',
  EXPIRED = 'expired',
}

export enum ReducerNames {
  AUTH = 'AuthReducer',
  ORGANIZATION = 'OrganizationReducer',
}
