/**
 * Hydra UI
 * Pages
 * Homepage
 */
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Layout, Space } from 'antd';
import Image from 'next/image';
import styles from 'styles/Home.module.css';
import { Rye } from '@next/font/google'

const DisplayFont = Rye({ weight: '400', });

/**
 * Renders a graphic to users when no servers are registered.
 */
function NoServers() {
  return (
    <div className={styles.noServers}>
      <Image
        src="/static/no_servers_graphic.png"
        alt="No Servers"
        height={450}
        width={578}
      />
      <h1 className={`${DisplayFont.className} ${styles.noServersTitle}`}>No Servers</h1>
      <Button type="primary">Add Server</Button>
    </div>
  );
}

/**
 * Homepage renders a overview of proxy servers.
 */
export default function Home() {
  interface Server {
    isOnline: boolean
    latencyMs: number
    address: {
      host: string
      port: number
    }
    cipher: string
  }
  // initially, render with no servers,
  const [servers, setServers] = useState([]);
  // TODO: trigger an api call effect to fetch currently registered Servers

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#E34B4B",
      },
    }}>
      <Layout>
        <Layout.Header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/static/hydra_logo_no_text.png" alt='logo' width={64} height={64} />
            <span className={`${DisplayFont.className} ${styles.logoTitle}`}>HYDRA</span>
          </div>
        </Layout.Header>

        <Layout.Content>
          {(servers.length <= 0) ? <NoServers /> : null}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}
