/**
 * Hydra UI
 * Pages
 * Homepage
 */
import React from 'react'
import { ConfigProvider, Layout } from 'antd';
import Image from 'next/image';
import styles from 'styles/Home.module.css';
import { Rye } from '@next/font/google'

const LogoFont = Rye({weight: '400',});

export default function Home() {
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#de2635",
      },
    }}>
      <Layout>
        <Layout.Header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/static/hydra_logo_no_text.png" alt='logo' width={64} height={64} />
            <span className={`${LogoFont.className} ${styles.logoTitle}`}>HYDRA</span>
          </div>
        </Layout.Header>
      </Layout>
    </ConfigProvider>
  )
}
