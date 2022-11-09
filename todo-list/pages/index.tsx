import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
export default function Home() {
  const [apiData, setApiData] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://todo-backend-bc5b.vercel.app/todo")
      .then(function (response: any) {
        // handle success
        console.log(response.data);
        setApiData(response.data);
        setUserInput("");
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
      .finally(function () {});
  }, [response]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    const todoToPost = userInput;
    axios
      .post("https://todo-backend-bc5b.vercel.app/todo", {
        todo: todoToPost,
      })
      .then(function (response) {
        setResponse(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteTodo = (id: number) => {
    console.log(id);

    const filterArray = apiData.filter((item: { id: number }) => item.id != id);

    setApiData(filterArray);

    axios
      .delete(`https://todo-backend-bc5b.vercel.app/todo/${id}`, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="FullStack TypeScript Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={"Add  a todo"}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        ></input>
        <button type={"submit"}>Add you todo</button>
      </form>

      {apiData.map((item: { id: number; todo: string }) => {
        return (
          <li>
            <p>{item.todo}</p>
            <button onClick={() => deleteTodo(item.id)}> delete</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push(`./updates/${item.id}`);
              }}
            >
              {" "}
              update
            </button>
          </li>
        );
      })}
    </div>
  );
}
