import style from './App.module.scss'
import { Content } from './components/content/Content'
import { Header } from './components/header/Header'

function App() {

  return (
    <div className={style.body}>
      <div className={style.header}><Header /></div>
      <div className={style.content}><Content /></div>
    </div>
  )
}

export default App
