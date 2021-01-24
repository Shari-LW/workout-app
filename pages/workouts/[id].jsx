import React from "react";
import { useRouter } from 'next/router'

const Workout = ({ name }) => {
  console.log(name);
  const router = useRouter()
  const { id } = router.query;
  return (
    <main>
      <div>ID: {id}</div>
      <div>Name: {name}</div>
    </main>
  )
};

// TODO: vicki to debug next to figure out how to make this path dynamic
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
    ],
    fallback: false
  };
}

export async function getStaticProps(context) {
  const res = await fetch(`https://swapi.dev/api/people/1/`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { name: data.name }
  }
}

export default Workout;
