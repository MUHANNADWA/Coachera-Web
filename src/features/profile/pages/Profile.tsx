import Message from "../../../shared/components/Message";
import { useAppSelector } from "../../../shared/hooks/hooks";

export default function Profile() {

  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      {!user?.accessToken ?
        <Message>
          You should be logged in to continue. <a href="/login">Login</a></Message> :
        <div>
        </div>
      }
    </div>
  );
}