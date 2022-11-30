import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Confetti from "react-dom-confetti";
export default function Home() {
  const [apiData, setApiData] = useState<{ id: number; todo: string }[] | []>(
    []
  );
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState({});
  const [conf, setConf] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  console.log(error);

  useEffect(() => {
    axios
      .get("https://todo-backend-bc5b.vercel.app/todo")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setApiData(response.data);
        setUserInput("");
      })
      .catch(function (error: any) {
        // handle error
        setError(error.message);
      })
      .finally(function () {});
  }, [response]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
    setConf(true);
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
      })
      .then(() => setConf(false));
  };

  const deleteTodo = (id: number) => {
    console.log(id);

    const filterArray = apiData!.filter(
      (item: { id: number }) => item.id != id
    );

    setApiData(filterArray);

    axios
      .delete(`https://todo-backend-bc5b.vercel.app/todo/${id}`, {})
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Typescript Todo List</title>
        <meta name="description" content="FullStack TypeScript Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>Todo List</h1>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          placeholder={"Add a todo........"}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        ></input>
        {apiData.length < 1 && <Confetti active={conf} />}
        <button type={"submit"}>Add your todo+</button>
      </form>
      {error && (
        <h2 className={styles.errorMessage}>
          Oops looks we're having a problem with our servers, please refresh or
          try again later...
        </h2>
      )}
      {!error && !apiData.length && (
        <h1 className={styles.noTodoMessage}>Add your first todo...</h1>
      )}
      <section className={styles.todoWrapper}>
        {!error &&
          apiData.map((item: { id: number; todo: string }) => {
            return (
              <div className={styles.displayCard}>
                <p>{item.todo}</p>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteTodo(item.id)}
                  >
                    {" "}
                    delete
                  </button>
                  <div></div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`./updates/${item.id}`);
                    }}
                    className={styles.editButton}
                  >
                    {" "}
                    update
                  </button>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}
