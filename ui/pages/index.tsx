import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button} from 'antd';
import {Rye} from '@next/font/google';

const logoFont = Rye({subsets: ["latin"], weight: ["400"]});

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <span className={logoFont.className}>Hydra</span>
        <Button type="primary">Add Proxy</Button>
      </nav>
    </div>
  )
}
