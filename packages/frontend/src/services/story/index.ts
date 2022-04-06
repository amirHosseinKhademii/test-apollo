import { gql } from "@apollo/client";

export const FEED_QUERY = gql`
  query getFeed {
    feed {
      posts {
        id
        events {
          id
        }
      }
    }
  }
`;

export const EVENT_QUERY = gql`
  query Eventquery($id: Int!) {
    event(where: { id: { _eq: $id } }) {
      id
      markets {
        id
      }
      name
    }
  }
`;

export const MARKET_QUERY = gql`
  query Marketquery($id: Int!) {
    market(where: { id: { _eq: $id } }) {
      id
      outcomes {
        id
      }
      name
    }
  }
`;

export const OUTCOME_QUERY = gql`
  query Outcomequery($id: Int!) {
    outcome(where: { id: { _eq: $id } }) {
      id
      name
      price
    }
  }
`;

export const EVENT_SUBSCRIPTION = gql`
  subscription Eventsub($id: Int!) {
    event(where: { id: { _eq: $id } }) {
      id
      markets {
        id
      }
      name
    }
  }
`;

export const MARKET_SUBSCRIPTION = gql`
  subscription Marketsub($id: Int!) {
    market(where: { id: { _eq: $id } }) {
      id
      outcomes {
        id
      }
      name
    }
  }
`;

export const OUTCOME_SUBSCRIPTION = gql`
  subscription Outcomesub($id: Int!) {
    outcome(where: { id: { _eq: $id } }) {
      id
      name
      price
    }
  }
`;
