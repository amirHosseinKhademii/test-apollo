import { useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import {
  EVENT_SUBSCRIPTION,
  FEED_QUERY,
  MARKET_SUBSCRIPTION,
  OUTCOME_SUBSCRIPTION,
} from "services/story";

const Feed = () => {
  const { data, loading } = useQuery(FEED_QUERY);

  if (loading && data === undefined) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-green-400">
      {data.feed[0].posts.map((p: any) => (
        <div key={p.id}>
          Post: {p.id}
          <div>
            {p.events.map((e: any) => (
              <FeedEvent eventId={e.id} key={e.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const FeedEvent = ({ eventId }: { eventId: any }) => {
  const { data, loading } = useSubscription(EVENT_SUBSCRIPTION, {
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
            {showMarket ? <FeedMarket marketId={m.id} key={m.id} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedMarket = ({ marketId }: { marketId: any }) => {
  const { data, loading } = useSubscription(MARKET_SUBSCRIPTION, {
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
          <FeedOutcome outcomeId={o.id} key={o.id} />
        ))}
      </div>
    </div>
  );
};

const FeedOutcome = ({ outcomeId }: { outcomeId: any }) => {
  const { data, loading } = useSubscription(OUTCOME_SUBSCRIPTION, {
    variables: { id: outcomeId },
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

const View = () => {
  return (
    <div className="max-w-md mx-auto  flex flex-col space-y-4 items-center px-2">
      Feed: <Feed />
    </div>
  );
};

export default View;
