import { useQuery } from "@apollo/client";
import { useState } from "react";
import { USER_STORIES } from "services/story";
import { USER_TODOS } from "services/todo";
import { USERS } from "services/user";
import { classNames } from "utils";

const UserStories = ({ todoId }: { todoId: string }) => {
  const { data, loading } = useQuery(USER_STORIES, { variables: { todoId } });

  return (
    <div
      className={classNames(
        "w-full flex flex-col space-y-2 bg-teal-500 p-3 min-h-[100px] rounded",
        loading && "animate-pulse bg-amber-600"
      )}
    >
      {data?.userStories?.data?.map((story: any) => (
        <div key={story.id}>{story.title}</div>
      ))}
    </div>
  );
};

const UserTodos = ({ userId }: { userId: string }) => {
  const { data, loading } = useQuery(USER_TODOS, { variables: { userId } });

  return (
    <div
      className={classNames(
        "w-full flex flex-col space-y-2 bg-cyan-300 p-3 min-h-[100px] rounded",
        loading && "animate-pulse bg-red-300"
      )}
    >
      {data?.userTodos?.data?.map((todo: any) => (
        <div className="w-full flex flex-col space-y-2" key={todo.id}>
          <div>{todo.title}</div>
          <UserStories todoId={todo.id} />
        </div>
      ))}
    </div>
  );
};

const Users = () => {
  // const { data: fi, loading: fiLoa } = useQuery(USER_TODOS, {
  //   variables: { userId: "622faab19b522ad913d7c09b" },
  // });
  // const { data: se, loading: seLoa } = useQuery(USER_TODOS, {
  //   variables: { userId: "622faaba9b522ad913d7c09f" },
  // });
  // const { data: th, loading: thLoa } = useQuery(USER_TODOS, {
  //   variables: { userId: "622faac09b522ad913d7c0a3" },
  // });
  // const { data: fo, loading: foLoa } = useQuery(USER_TODOS, {
  //   variables: { userId: "6233202801de9c9aab91a7f2" },
  // });
  // const { data: fif, loading: fifLoa } = useQuery(USER_TODOS, {
  //   variables: { userId: "6233224801de9c9aab91a825" },
  // });

  // console.log({ fi, se, th, fo, fif, fiLoa, seLoa, thLoa, foLoa, fifLoa });

  // return <div></div>;
  const { data, fetchMore, networkStatus } = useQuery(USERS, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 3, offset: 0 },
  });

  const onFetchMore = () =>
    fetchMore({
      variables: { offset: data?.users?.next },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          users: {
            ...fetchMoreResult?.users,
            data: [...prev?.users?.data, ...fetchMoreResult?.users?.data],
          },
        };
      },
    });

  if (networkStatus === 1)
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </>
    );
  return (
    <div className="w-full flex flex-col space-y-4 py-6">
      {data?.users?.data?.map((user: any) => (
        <div
          className="bg-gray-300 w-full rounded p-6 flex flex-col space-y-2 shadow-lg"
          key={user.id}
        >
          <p> {user.user_name}</p>
          <UserTodos userId={user.id} />
        </div>
      ))}
      {data?.users?.next && (
        <button
          className="w-full h-8 rounded bg-indigo-500"
          onClick={onFetchMore}
        >
          More
        </button>
      )}
    </div>
  );
};

const View = () => {
  const [is, setis] = useState(false);

  return (
    <div className="max-w-md mx-auto  flex flex-col space-y-4 items-center px-2">
      <button onClick={() => setis(!is)}>Open</button>
      {is && <Users />}
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="bg-yellow-300 w-full rounded p-6 flex flex-col space-y-2 shadow-lg animate-pulse min-h-[100px]"></div>
  );
};

export default View;
