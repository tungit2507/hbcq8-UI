import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
  cilPeople,
  cilSpreadsheet,
  cilLocationPin,
  cilPhone
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import Swal from 'sweetalert2'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Thống Kê',
  //   to: '#',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   onClick: () => Swal.fire('Thông báo', 'Tính năng đang phát triển', 'info').then(() => setTimeout(() => Swal.close(), 2000)),
  // },
  {
    component: CNavGroup,
    name: 'Quản Lý Thành Viên',
    to: '#',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Thành Viên',
        to: '/management/user/list',
      },
      {
        component: CNavItem,
        name: 'Thêm Thành Viên',
        to: '/management/user/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Giải Đua',
    to: '',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Giải Đua',
        to: '/management/race/list',
      },
      {
        component: CNavItem,
        name: 'Thêm Giải Đua',
        to: '/management/race/add',
      },
      {
        component: CNavItem,
        name: 'Quản Lý Điểm Xuất Phát',
        to: '/management/start-point/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Bài Viết',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Bài Viết',
        to: '/management/article/list',
      },
      {
        component: CNavItem,
        name: 'Thêm Bài Viết',
        to: '/management/article/add',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Thông Tin',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
    items: [  
      {
        component: CNavItem,
        name: 'Danh Sách SĐT',
        to: '/management/info/phonenumber',
      },
      {
        component: CNavItem,
        name: 'Về Chúng Tôi',
        to: '/management/info/about-us',
      },
       ],
  }
]

export default _nav
