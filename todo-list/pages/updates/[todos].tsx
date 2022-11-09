import React, { useState } from "react";
import style from "./UpdatePage.module.css";
import axios from "axios";
import { useRouter } from "next/router";
const UpdatePage = (data: { data: [{ id: number; todo: string }] }) => {
  console.log(data);
  const router = useRouter();
  const [upDatedTodo, setUpdateTodo] = useState("");

  const upDate = () => {
    if (!upDatedTodo) {
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
      <h1 className={style.UpdateTitle}>Edit Todo</h1>
      <section className={style.UpdateWrapper}>
        <p className={style.oldData}>Old data: {data.data[0].todo}</p>

        <input
          placeholder={data.data[0].todo}
          onChange={(e) => setUpdateTodo(e.target.value)}
        ></input>
        <div className={style.buttonWrapper}>
          {upDatedTodo && (
            <button className={style.saveButton} type="button" onClick={upDate}>
              save
            </button>
          )}
          <button
            className={style.backButton}
            type="button"
            onClick={() => router.push("../")}
          >
            go back
          </button>
        </div>
      </section>
    </div>
  );
};

export default UpdatePage;
export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const todoToFind = context.params.todos;

  const res = await fetch(
    `https://todo-backend-bc5b.vercel.app/todo/${todoToFind}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
