import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const UpdatePage = (data: [{ id: number; todo: string }]) => {
  const router = useRouter();
  const [upDatedTodo, setUpdateTodo] = useState("");

  const upDate = () => {
    if (!upDatedTodo) {
      console.log("please enter some text");
      return;
    }
    axios
      .put(`https://todo-backend-bc5b.vercel.app/todo/${data.data[0].id}`, {
        todo: upDatedTodo,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        router.push("../");
      });
  };

  return (
    <div>
      <button type="button" onClick={() => router.push("../")}>
        Go back
      </button>
      <h1>Edit Todo</h1>
      <section>
        <p>{data.data[0].todo}</p>
        <input
          placeholder={data.data[0].todo}
          onChange={(e) => setUpdateTodo(e.target.value)}
        ></input>
        <button type="button" onClick={upDate}>
          Update
        </button>
      </section>
    </div>
  );
};

export default UpdatePage;
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const todoToFind = context.params.todos;
  //console.log(todoToFind);

  const res = await fetch(
    `https://todo-backend-bc5b.vercel.app/todo/${todoToFind}`
  );
  const data = await res.json();
  console.log(data);
  // Pass data to the page via props
  return { props: { data } };
}
