/**
 * Hydra UI
 * Components
 * ProxyForm
 */

import { Button, Form, Input, InputNumber, Select, Tooltip } from 'antd'
import { ProxyData } from '../pages/api/proxy'
import { csrfFetch as fetch } from '../csrf'

/**
 * Form to collect user input on Proxy configuration.
 */
export default function ProxyForm() {
  // Form Item Wrapper
  interface ItemProps {
    id: string
    label: string
    required?: boolean
    tooltip: string
    children: JSX.Element
  }

  const Item = ({ id, label, required, tooltip, children }: ItemProps): JSX.Element => {
    return (
      <Tooltip placement='topRight' trigger={["focus"]} title={tooltip}>
        <Form.Item
          name={id}
          label={label}
          rules={[{ required }]}
        >
          {children}
        </Form.Item>
      </Tooltip>
    );
  };

  // Supported cipher options for shadowsocks proxy
  const supportedCiphers = [
    "2022-blake3-aes-256-gcm",
    "2022-blake3-aes-128-gcm",
    "2022-blake3-chacha20-poly1305",
    "2022-blake3-chacha8-poly1305"
  ].map(c => { return { value: c, label: c } });

  function submit(proxy: ProxyData) {
    fetch("/api/proxies", {
      method: "PUT",
      body: JSON.stringify(proxy)
    });
  }

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onFinish={submit}
    >
      <Item
        id="host"
        label="Host"
        required={true}
        tooltip="Publicly accessible host/IP of the Proxy."
      >
        <Input placeholder="0.0.0.0" />
      </Item>

      <Item
        id="port"
        label="Port"
        required={true}
        tooltip="Exposed port to listen for Proxy requests."
      >
        <InputNumber placeholder="8388" min={1} />
      </Item>

      <Item
        id="password"
        label="Password"
        required={true}
        tooltip="Password for authenticating Proxy clients."
      >
        <Input.Password minLength={8} />
      </Item>

      <Item
        id="cipher"
        label="Cipher"
        required={true}
        tooltip="Cipher used to encrypt network transmission between the Proxy & clients."
      >
        <Select options={supportedCiphers} defaultValue={supportedCiphers[0]}/>
      </Item>

      <Form.Item
        name="submit"
        wrapperCol={{ offset: 2 }}
      >
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
}
