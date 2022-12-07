/**
 * Hydra UI
 * Pages
 * Homepage
 */
import React from 'react'
import ProxyForm from '../components/ProxyForm'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <ProxyForm />
    </div>
  )
}
