/**
 * Hydra Ui
 * Components
 * ProxyForm
 */

import { Form, Input, InputNumber, Tooltip } from 'antd'

interface FormItemProps {
  label: string
  required?: boolean
  tooltip: string
  children: JSX.Element
}


/** Rewrites & the given text in 'kebab-case' */
function slugify(text: string): string {
  return text.split(" ").map(token => token.toLowerCase()).join(" ");
}

const FormItem = ({ label, required, tooltip, children }: FormItemProps): JSX.Element => {
  return (
    <Form.Item
      name={slugify(label)}
      label={label}
      rules={[{ required }]}
    >
      <Tooltip placement='right' trigger={["focus"]} title={tooltip}>
        {children}
      </Tooltip>
    </Form.Item>
  );
}

/**
 * Form to collect user input on Proxy configuration.
 */
export default function ProxyForm() {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
    >
      <FormItem
        label="IP Address"
        required={true}
        tooltip="Publicly accessible IPV4 address of the Proxy."
      >
        <Input placeholder="0.0.0.0" />
      </FormItem>

      <FormItem
        label="Port Number"
        required={true}
        tooltip="Exposed port to listen for Proxy requests."
      >
        <InputNumber placeholder="8388" min={1} />
      </FormItem>

      <FormItem
        label="Password"
        required={true}
        tooltip="Password for authenticating Proxy clients."
      >
        <Input.Password />
      </FormItem>

      <FormItem
        label="Cipher"
        required={true}
        tooltip="Cipher used to encrypt network transmission between the Proxy & clients."
      >
        <Input defaultValue="2022-blake3-aes-256-gcm" />
      </FormItem>
    </Form>
  );
}
