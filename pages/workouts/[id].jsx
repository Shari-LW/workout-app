import React from "react";
import { useRouter } from 'next/router'

const Workout = () => {
  const router = useRouter()
  const { id } = router.query;
  return (
    <main>
      <div>ID: {id}</div>
    </main>
  )
};

export default Workout;
