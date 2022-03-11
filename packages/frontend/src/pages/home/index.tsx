import { useQuery } from "@apollo/client";
import { USER } from "services/user";

const View = () => {
  const { data: one, loading: isOne } = useQuery(USER, {
    variables: { userId: "622ba2d3937d4361d8426f2e" },
  });
  const { data: two, loading: isTwo } = useQuery(USER, {
    variables: { userId: "622ba33c937d4361d8426f39" },
  });
  const { data: three, loading: isThree } = useQuery(USER, {
    variables: { userId: "622ba6e94bdffe39bb84c2d3" },
  });
  const { data: four, loading: isFour } = useQuery(USER, {
    variables: { userId: "622ba6ed4bdffe39bb84c2d7" },
  });

  console.log({ one, isOne, two, isTwo, three, isThree, four, isFour });

  return <div className="max-w-sm mx-auto pt-32"></div>;
};

export default View;
