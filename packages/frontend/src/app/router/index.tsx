import { memo, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
//import { Toast } from 'components/toast'
import { Skeleton } from 'components/skeleton'
import { routes } from './routes'
import { NotFound } from './not-found'

export const Router = memo(() => (
  <Suspense fallback={<Skeleton />}>
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
      <Route path="/test" element={<div>test</div>} />
      <Route element={<NotFound />} />
    </Routes>
  </Suspense>
))
