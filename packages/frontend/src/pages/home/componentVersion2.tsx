import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import {
  EVENT_QUERY,
  FEED_QUERY,
  MARKET_QUERY,
  OUTCOME_QUERY,
} from "services/story";

const FeedV2 = () => {
  const { data, loading } = useQuery(FEED_QUERY);

  if (loading && data === undefined) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-green-400">
      {data.feed[0].posts.map((p: any) => (
        <div key={p.id}>
          Post: {p.id}
          <div>
            {p.events.map((e: any) => (
              <FeedEventV2 eventId={e.id} key={e.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const FeedEventV2 = ({ eventId }: { eventId: any }) => {
  const { data, loading } = useQuery(EVENT_QUERY, {
    variables: { id: eventId },
  });
  const [showMarket, setShowMarket] = useState(true);

  if (loading && data === undefined) return <div>Loading...</div>;
  const feedEvent = data.event[0];

  return (
    <div className="p-4 bg-blue-400">
      <div>Name: {feedEvent.name}</div>
      <div>Id: {feedEvent.id}</div>
      <div>
        <button onClick={() => setShowMarket((oldVal) => !oldVal)}>
          Toggle
        </button>
        Markets:
        {feedEvent.markets.map((m: any) => (
          <div key={m.id}>
            {showMarket ? <FeedMarketV2 marketId={m.id} key={m.id} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedMarketV2 = ({ marketId }: { marketId: any }) => {
  const { data, loading } = useQuery(MARKET_QUERY, {
    variables: { id: marketId },
  });

  if (loading && data === undefined) return <div>Loading...</div>;

  const market = data.market[0];

  return (
    <div className="p-4 bg-yellow-400">
      <div>Name: {market.name}</div>
      <div>Id: {market.id}</div>
      <div>
        Markets:{" "}
        {market.outcomes.map((o: any) => (
          <FeedOutcomeV2 outcomeId={o.id} key={o.id} />
        ))}
      </div>
    </div>
  );
};

const FeedOutcomeV2 = ({ outcomeId }: { outcomeId: any }) => {
  const { data, loading } = useQuery(OUTCOME_QUERY, {
    variables: { id: outcomeId },
    pollInterval: 10000,
  });

  if (loading && data === undefined) return <div>Loading...</div>;

  const outcome = data.outcome[0];
  return (
    <div className="p-4 bg-red-400">
      <div>Name: {outcome.name}</div>
      <div>Id: {outcome.id}</div>
      <div>Price: {outcome.price}</div>
    </div>
  );
};

export default FeedV2;
