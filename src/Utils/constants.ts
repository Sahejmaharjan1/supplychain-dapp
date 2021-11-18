import { FileProtectOutlined, GlobalOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'
import { SideMenuProps } from './types'
import { CustomRoles } from './enums'

const company_details = {
  title: 'Smart Ads Nepal Pvt. ltd.' ,
  name: 'Smart Ads Nepal',
  logo: '',
}

const navigations = {
  home: {
    url: '/',
    display_name: 'Home',
  }
}

const aws_config = {
  end_point_name: {
    backend: 'smartAdApi',
    cognito: 'smartAdCognitoApi',
  }
}

const defaultRouteUrl = {
  [CustomRoles.SUPER_ADMIN]: '/super',
  [CustomRoles.PORTAL_ADMIN]: '/organization/portal_admin',
  [CustomRoles.PORTAL_STAFF]: '/organization/portal_staff',
}

const userInfoRole = {
  [CustomRoles.SUPER_ADMIN]: 'SUPER ADMIN',
  [CustomRoles.PORTAL_ADMIN]: 'PORTAL ADMIN',
  [CustomRoles.PORTAL_STAFF]: 'PORTAL STAFF',
}

const SuperAdminSidebarItems: SideMenuProps[] = [
  {
    label: 'Organization',
    path: `${defaultRouteUrl[CustomRoles.SUPER_ADMIN]}/organization`,
    icon: UserOutlined,
    key: '1',
    subMenu: []
  },
  {
    label: 'Portals',
    path: `${defaultRouteUrl[CustomRoles.SUPER_ADMIN]}/portal`,
    icon: GlobalOutlined,
    key: '2',
    subMenu: []
  },
  {
    label: 'User Management',
    path: `${defaultRouteUrl[CustomRoles.SUPER_ADMIN]}/user`,
    icon: ShopOutlined,
    key: '3',
    subMenu: []
  },
]

const PortalAdminSidebarItems: SideMenuProps[] = [
  {
    label: 'Dashboard',
    path: `${defaultRouteUrl[CustomRoles.PORTAL_ADMIN]}/dashboard`,
    icon: GlobalOutlined,
    key: '1',
    subMenu: []
  },
  {
    label: 'User Management',
    path: `${defaultRouteUrl[CustomRoles.PORTAL_ADMIN]}/user`,
    icon: UserOutlined,
    key: '2',
    subMenu: []
  },
]

const PortalStaffSidebarItems: SideMenuProps[] = [
  {
    label: 'Dashboard',
    path: `${defaultRouteUrl[CustomRoles.PORTAL_STAFF]}/dashboard`,
    icon: GlobalOutlined,
    key: '1',
    subMenu: []
  },
  {
    label: 'Ads Management',
    path: `${defaultRouteUrl[CustomRoles.PORTAL_STAFF]}/ads`,
    icon: UserOutlined,
    key: '2',
    subMenu: []
  },
  {
    label: 'Contracts',
    path: `${defaultRouteUrl[CustomRoles.PORTAL_STAFF]}/contracts`,
    icon: FileProtectOutlined,
    key: '3',
    subMenu: []
  },
]

const genderOptions = [{
  label: 'Female',
  value: 'Female'
},{
  label: 'Male',
  value: 'Male'
},{
  label: 'Other',
  value: 'Other'
}]

const organizationTypeOptions = [
  {
    label: 'Portal',
    value: 'portal'
  },
  {
    label: 'Advertiser',
    value: 'advertiser'
  },
]

const adContentTypeOptions = [
  {
    label: 'Image',
    value: 'Image'
  },
  {
    label: 'GIF',
    value: 'GIF'
  },
]

const portalTypeOptions = [
  {
    label: 'Website',
    value: 'website',
  },
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'POD',
    value: 'pod',
  }
]

const dataReFetchMaxDiff = 1000 * 60 * 2 /*Millisecond x Second x Minute*/

export { navigations,
  userInfoRole,
  adContentTypeOptions,
  aws_config,
  company_details,
  defaultRouteUrl,
  genderOptions,
  dataReFetchMaxDiff,
  organizationTypeOptions,
  PortalAdminSidebarItems,
  PortalStaffSidebarItems,
  portalTypeOptions,
  SuperAdminSidebarItems,
}
