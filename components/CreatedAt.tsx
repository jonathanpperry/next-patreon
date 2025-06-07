"use client";

import TimeAgo from "react-timeago";

function CreatedAt({ date }: { date: string }) {
  return <TimeAgo date={date} />;
}

export default CreatedAt;
