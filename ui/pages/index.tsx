/**
 * Hydra UI
 * Pages
 * Homepage
 */
import React from 'react'
import { ConfigProvider, Layout, Table, theme } from 'antd';
import ProxyForm from '../components/ProxyForm'

import styles from '../styles/Home.module.css'
import { ColumnType } from 'antd/es/table';

const { Header, Sider, Content } = Layout;
interface ProxyListing {
  host: string
  status: boolean
  latencyMs: number
  ssURL: string
}

export default function Home() {
  const columns: ColumnType<ProxyListing>[] = [
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Latency",
      dataIndex: "latencyMs",
      key: "latencyMs"
    },
    {
      title: "URL",
      dataIndex: "ssURL",
      key: "ssURL"
    },
  ]

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#de2635",
      },
    }}>
      <Layout className={styles.main}>
        <Layout>
          <Header style={{ backgroundColor: "white" }}>
            HYDRA
          </Header>
          <Content>
            <Table columns={columns} />
          </Content>
        </Layout>
        <Sider width={400} collapsedWidth={0} collapsible={true} reverseArrow={true} theme="light">
          <ProxyForm />
        </Sider>
      </Layout>
    </ConfigProvider>
  )
}
