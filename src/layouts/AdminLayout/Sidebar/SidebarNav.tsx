import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faStar,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import {
  faChartPie,
  faChevronUp,
  faShirt,
  faPencil,
  faRightToBracket,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'
import React, {
  PropsWithChildren, useContext, useEffect, useState, SyntheticEvent,
} from 'react'
import {
  Accordion, AccordionContext, Button, Nav, useAccordionButton,
} from 'react-bootstrap'
import classNames from 'classnames'
import Link from 'next/link'
import { MarFashionContext } from 'src/context/MarFashionProvider'

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const {
    icon,
    children,
    href,
  } = props

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
            : <span className="nav-icon ms-n3" />}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  )
}

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

type SidebarNavGroupToggleProps = {
  eventKey: string;
  icon: IconDefinition;
  setIsShow: (isShow: boolean) => void;
} & PropsWithChildren

const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
  // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
  const { activeEventKey } = useContext(AccordionContext)
  const { eventKey, icon, children, setIsShow } = props

  const decoratedOnClick = useAccordionButton(eventKey)

  const isCurrentEventKey = activeEventKey === eventKey

  useEffect(() => {
    setIsShow(activeEventKey === eventKey)
  }, [activeEventKey, eventKey, setIsShow])

  return (
    <Button
      variant="link"
      type="button"
      className={classNames('rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none', {
        collapsed: !isCurrentEventKey,
      })}
      onClick={decoratedOnClick}
    >
      <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
      {children}
      <div className="nav-chevron ms-auto text-end">
        <FontAwesomeIcon size="xs" icon={faChevronUp} />
      </div>
    </Button>
  )
}

type SidebarNavGroupProps = {
  toggleIcon: IconDefinition;
  toggleText: string;
} & PropsWithChildren

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const {
    toggleIcon,
    toggleText,
    children,
  } = props

  const [isShow, setIsShow] = useState(false)

  return (
    <Accordion as="li" bsPrefix="nav-group" className={classNames({ show: isShow })}>
      <SidebarNavGroupToggle icon={toggleIcon} eventKey="0" setIsShow={setIsShow}>{toggleText}</SidebarNavGroupToggle>
      <Accordion.Collapse eventKey="0">
        <ul className="nav-group-items list-unstyled">
          {children}
        </ul>
      </Accordion.Collapse>
    </Accordion>
  )
}

export default function SidebarNav() {

  const { user, Logout } = useContext(MarFashionContext);
  const handleLogout = async (event: SyntheticEvent) => {
    event.preventDefault()
    Logout()
  }
  console.log('ini dari sideNav',user);

  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>Dashboard</SidebarNavTitle>
      <SidebarNavItem icon={faShirt} href="/">{user.userName}</SidebarNavItem>
      <SidebarNavGroup toggleIcon={faMoneyBill} toggleText="Keuanga">
        <SidebarNavItem href="/">Keuangan</SidebarNavItem>
        <SidebarNavItem href="/">Nota Pembelian</SidebarNavItem>
        <SidebarNavItem href="/">Nota Penjualan</SidebarNavItem>
      </SidebarNavGroup>
      <SidebarNavItem icon={faPencil} href="typography.html">Karyawan</SidebarNavItem>
      <SidebarNavItem icon={faChartPie} href="charts.html">Supplier</SidebarNavItem>
      <SidebarNavItem icon={faChartPie} href="charts.html">Retur</SidebarNavItem>
      <SidebarNavGroup toggleIcon={faStar} toggleText="User">
        <SidebarNavItem icon={faAddressCard} href="register">Buat Akun</SidebarNavItem>
        <div onClick={Logout}>
          <SidebarNavItem icon={faRightToBracket} href="/">Log Out</SidebarNavItem>
        </div>
      </SidebarNavGroup>
    </ul>
  )
}
