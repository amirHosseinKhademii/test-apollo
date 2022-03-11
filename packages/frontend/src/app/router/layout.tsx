import { useLocation, matchPath } from 'react-router-dom'
import { routes } from './routes'
import { AdminLayout } from 'layouts/admin'
import { ReactNode } from 'react'

const layouts: Record<string, any> = {
  admin: AdminLayout,
}

type TLayout = { children?: ReactNode }

const DefaultLayout = ({ children }: TLayout) => <>{children}</>

export const Layout = ({ children }: TLayout): ReactNode => {
  const { pathname } = useLocation()

  const match = routes
    .map((item) => ({
      ...item,
      match: matchPath(pathname, item),
    }))
    .find((item) => !!item.match)

  const layoutName = (match || {}).layout || ''
  const LayoutComponent = layouts[layoutName] || DefaultLayout

  return <LayoutComponent>{children}</LayoutComponent>
}
