import Footer from '../../../shared/footer';
import Header from '../../../shared/header';
import styles from './Home.module.scss';

export default function Home(){
  return (
    <>
      <Header />
      <main className={styles['home']}>
        home
      </main>
      <Footer />
    </>
  )
}