import style from "./content.module.scss";
import { useState } from "react";

export const Content = () => {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_PREDICTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data.predict);
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setResult("Произошла ошибка при обработке запроса.");
    }
  };

  return (
    <div className={style.content}>
      <div className={style.content__desc}>
        Пожалуйста, вставьте текст вашей новости в поле ниже.
        <span>
          Мы ценим ваше время и хотим помочь вам классифицировать вашу новость.
          Убедитесь, что текст содержит все необходимые детали, чтобы мы могли
          предоставить вам наиболее точный результат.
        </span>
      </div>
      <form className={style.content__form} onSubmit={handleSubmit}>
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className={style.content__btn} type="submit">
          Проверить
        </button>
      </form>
      {result && (
        <div className={style.content__result}>
          <div>Предсказанная категория:</div>
          <span>{result}</span>
        </div>
      )}
    </div>
  );
};
