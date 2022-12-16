/**
 * Hydra UI
 * Pages
 * Homepage
 */
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Layout, Table } from 'antd';
import Image from 'next/image';
import styles from 'styles/Home.module.css';
import { Rye } from '@next/font/google'
import type { ColumnType } from 'antd/es/table';

const DisplayFont = Rye({ weight: '400', });

interface Server {
  isOnline: boolean
  latencyMs: number
  host: string
  port: number
  cipher: string
}


const AddButton = () => <Button type="primary">Add Server</Button>;

/** Renders a graphic to users when no servers are registered. */
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
      <AddButton />
    </div>
  );
}

/** Render a status indicator-to convey to whether the server is is online. */
function StatusIndicator(isOnline: boolean) {
  return isOnline ?
    (<div className={styles.statusOnline}></div>) :
    (<div className={styles.statusOffline}></div>);
}

/** Renders a table currently registered servers */
function Servers(servers: Server[]) {
  const columns: ColumnType<Server>[] = [
    {
      title: "Status",
      dataIndex: "isOnline",
      render: StatusIndicator,
    }
  ];

  return (
    <div className={styles.servers}>
      <div className={styles.serversHeader}>
        <h1 className={`${DisplayFont.className} ${styles.serversTitle}`}>Servers</h1>
        <AddButton />
      </div>
      <Table columns={columns} dataSource={servers} />
    </div>
  );
}
export default function Home() {
  // initially, render with no servers,
  const [servers, setServers] = useState([
    {
      key: "test",
      isOnline: true,
      latencyMs: 300,
      host: "127.0.0.1",
      port: 1080,
      cipher: "2022-blake3-aes-256-gcm"
    }
  ]);

  // TODO: trigger an api call effect to fetch currently registered Servers
  const content = (servers.length <= 0) ? NoServers() : Servers(servers);

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
          {content}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}
