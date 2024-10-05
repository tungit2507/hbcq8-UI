import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilSpeedometer,
  cilPeople,
  cilSpreadsheet,
  cilUserFollow,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import Swal from 'sweetalert2'

const _nav = [
  {
    component: CNavItem,
    name: 'Thống Kê',
    to: '#',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    onClick: () => Swal.fire('Thông báo', 'Tính năng đang phát triển', 'info').then(() => setTimeout(() => Swal.close(), 2000)),
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Thành Viên',
    to: '#',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh Sách Thành Viên',
        to: '#',
        onClick: () => Swal.fire('Thông báo', 'Tính năng đang phát triển', 'info').then(() => setTimeout(() => Swal.close(), 2000)),
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Quản Lý Giải Đua',
    to: '/base',
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
    ],
  }
]

export default _nav
