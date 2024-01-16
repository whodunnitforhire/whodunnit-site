import { useSession, signOut } from "next-auth/react";
import React from "react";

function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;
