import { Router } from './router'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from 'graphql/client'
// import { QueryClient, QueryClientProvider } from 'react-query'

const Boot = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

// const Boot = () => {
//   return (
//     <QueryClientProvider client={new QueryClient()}>
//       <BrowserRouter>
//         <Router />
//       </BrowserRouter>
//     </QueryClientProvider>
//   )
// }

export { Boot }
