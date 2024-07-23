import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className="container">
      <div className={`${styles["not-found"]} prose`}>
        <h1>Not found</h1>
        <p>The page you are looking for was not found 😕</p>
      </div>
    </div>
  );
}
