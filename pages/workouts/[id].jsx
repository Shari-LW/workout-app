import React from "react";

const Workout = ({ data }) => {
  const { workout } = data;
  const { type, duration } = workout;

  return (
    <main>
      <div>
        This workout is of type {type} and duration {duration}
      </div>
    </main>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:3000/api/workouts/${params.id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default Workout;
