import { useMessages } from '../hooks/useMessages';
import style from '../styles/header.module.scss';

export function Header() {
  const { author } = useMessages();

  return author.name ? (
    <div className={style.container}>
      <h1 className={style.title}>
        Bem vindo,
        <span className={style.name}> {author.name}</span>
      </h1>
    </div>
  ) : (
    <div></div>
  );
}
