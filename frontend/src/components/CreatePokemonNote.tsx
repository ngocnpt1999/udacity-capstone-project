import React from "react";
import { Form, Input, Button, InputNumber, message, Spin } from "antd";
import Auth from "../auth/Auth";
import { History } from "history";
import {
  createPokemonNote,
  getUploadUrl,
  uploadFile,
} from "../api/pokemon-note-api";
import { bucketName } from "../config";

interface CreatePkmNoteProps {
  auth: Auth;
  history: History;
}

const CreatePokemonNote = (props: CreatePkmNoteProps) => {
  const [form] = Form.useForm();
  const [file, setFile] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    setFile(files[0]);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (!file) {
        alert("File should be selected");
        return;
      }

      const keyName = `upload_image_${new Date().getTime()}`;
      const uploadUrl = await getUploadUrl(props.auth.getIdToken(), keyName);
      await uploadFile(uploadUrl, file);
      const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${keyName}`;
      await createPokemonNote(props.auth.getIdToken(), {
        attachmentUrl: attachmentUrl,
        ...values,
      });
      message.success("Pokemon note created");
      form.resetFields();
      props.history.push("/");
    } catch (e) {
      alert("Pokemon note creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600, padding: "20px" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the Pokemon name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Attribute"
          name="attribute"
          rules={[
            { required: true, message: "Please enter the Pokemon attribute!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Combat Power"
          name="combatPower"
          rules={[
            {
              required: true,
              message: "Please enter the Pokemon combat power!",
            },
            {
              type: "number",
              min: 1,
              max: 100,
              message: "Combat power must be between 1 and 100",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Attachment">
          <input
            type="file"
            accept="image/*"
            placeholder="Image to upload"
            onChange={handleFileChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePokemonNote;
