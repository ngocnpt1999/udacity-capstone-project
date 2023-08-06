import React from "react";
import { Modal, Form, Input, InputNumber, message } from "antd";
import Auth from "../../auth/Auth";
import { History } from "history";
import { patchPokemonNote } from "../../api/pokemon-note-api";
import { PokemonNote } from "../../types/PokemonNote";

interface UpdatePkmNoteProps {
  auth: Auth;
  history: History;
  open: boolean;
  initialData: PokemonNote | undefined;
  onUpdate: () => void;
  onCancel: () => void;
}

const UpdatePokemonNoteModal = (props: UpdatePkmNoteProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (props.open) {
      form.setFieldsValue(props.initialData);
    }
  }, [props.open, props.initialData, form]);

  const onFinish = async (values: any) => {
    if (!props.initialData) {
      return;
    }

    setLoading(true);
    try {
      await patchPokemonNote(
        props.auth.getIdToken(),
        props.initialData.noteId,
        { ...values }
      );
      message.success("Pokemon note updated.");
      props.onUpdate();
    } catch (e) {
      alert(`Error updating Pokemon Note: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={props.open}
      title="Update Pokemon Note"
      okText="Update"
      cancelText="Cancel"
      onCancel={props.onCancel}
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={props.initialData}
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
      </Form>
    </Modal>
  );
};

export default UpdatePokemonNoteModal;
