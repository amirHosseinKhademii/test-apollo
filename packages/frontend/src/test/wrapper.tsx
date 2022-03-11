import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryHistory } from 'history'
import { UiProvider } from 'provider/ui-provider'
import { ReactNode } from 'react'
import { Router } from 'react-router-dom'

export const history = createMemoryHistory()

export const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <UiProvider>
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    </UiProvider>
  </QueryClientProvider>
)
