import React from "react";
import { List, Avatar, Spin, message } from "antd";
import Auth from "../auth/Auth";
import { History } from "history";
import { PokemonNote } from "../types/PokemonNote";
import { getPokemonNotes, deletePokemonNote } from "../api/pokemon-note-api";
import UpdatePokemonNoteModal from "./modals/UpdatePokemonNoteModal";

interface PokemonNotesProps {
  auth: Auth;
  history: History;
}

const PokemonNotes = (props: PokemonNotesProps) => {
  const [pkmNotes, setPkmNotes] = React.useState<PokemonNote[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    React.useState<boolean>(false);
  const [initialUpdateData, setInitialUpdateData] =
    React.useState<PokemonNote>();

  const fetchPkmNotes = async () => {
    setLoading(true);
    try {
      const pkmNotes = await getPokemonNotes(props.auth.getIdToken());
      setPkmNotes(pkmNotes);
      setLoading(false);
    } catch (e) {
      alert(`Failed to fetch: ${(e as Error).message}`);
    }
  };

  React.useEffect(() => {
    fetchPkmNotes();
  }, []);

  const showUpdateModal = (item: PokemonNote) => {
    setInitialUpdateData(item);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = () => {
    setIsUpdateModalOpen(false);
    fetchPkmNotes();
  };

  const handleDelete = async (noteId: string) => {
    setLoading(true);
    try {
      await deletePokemonNote(props.auth.getIdToken(), noteId);
      message.success("Pokemon note deleted.");
      fetchPkmNotes();
    } catch (e) {
      alert("Pokemon note deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderLoading = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  };

  const renderList = () => {
    if (loading) {
      return renderLoading();
    }

    return (
      <>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={pkmNotes}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-edit" onClick={() => showUpdateModal(item)}>
                  Edit
                </a>,
                <a key="list-delete" onClick={() => handleDelete(item.noteId)}>
                  Delete
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar shape="square" size={64} src={item.attachmentUrl} />
                }
                title={item.name}
                description={item.description}
              />
              <p>
                Attribute: {item.attribute} - CP: {item.combatPower}
              </p>
              <p>Created At: {item.createdAt}</p>
              {item.updatedAt && <p>Updated At: {item.updatedAt}</p>}
            </List.Item>
          )}
        />
        <UpdatePokemonNoteModal
          {...props}
          auth={props.auth}
          open={isUpdateModalOpen}
          initialData={initialUpdateData}
          onUpdate={handleUpdate}
          onCancel={handleUpdateCancel}
        />
      </>
    );
  };

  return renderList();
};

export default PokemonNotes;
