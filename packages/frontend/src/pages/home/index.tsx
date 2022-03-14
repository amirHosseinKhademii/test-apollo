import { useQuery } from "@apollo/client";
import { useState } from "react";
import { USER } from "services/user";
import { classNames } from "utils";

const Users = () => {
  const { data: one, loading: isOne } = useQuery(USER, {
    variables: { userId: "622faaa69b522ad913d7c097" },
  });
  const { data: two, loading: isTwo } = useQuery(USER, {
    variables: { userId: "622faab19b522ad913d7c09b" },
  });
  const { data: three, loading: isThree } = useQuery(USER, {
    variables: { userId: "622faaba9b522ad913d7c09f" },
  });
  const { data: four, loading: isFour } = useQuery(USER, {
    variables: { userId: "622faac09b522ad913d7c0a3" },
  });

  console.log({ one, isOne, two, isTwo, three, isThree, four, isFour });

  return (
    <div className="max-w-sm mx-auto pt-32">
      <div className={classNames(isOne && "animate-pulse text-red-600")}>
        <p>{one?.user.id}</p>
        <p>{one?.user.email}</p>
      </div>
      <div className={classNames(isTwo && "animate-pulse text-red-600")}>
        <p>{two?.user.id}</p>
        <p>{two?.user.email}</p>
      </div>
      <div className={classNames(isThree && "animate-pulse text-red-600")}>
        <p>{three?.user.id}</p>
        <p>{three?.user.email}</p>
      </div>
      <div className={classNames(isFour && "animate-pulse text-red-600")}>
        <p>{four?.user.id}</p>
        <p>{four?.user.email}</p>
      </div>
    </div>
  );
};

const View = () => {
  const [is, setis] = useState(false);

  return (
    <div>
      <button onClick={() => setis(!is)}>Open</button>
      {is && <Users />}
    </div>
  );
};

export default View;
