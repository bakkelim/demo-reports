import {
  ContentWrapper,
  InnerContentWrapper,
  TableWrapper,
  UpperCol,
  UpperRow,
} from "./styled";
import useModal from "../../../hooks/useModal";
import { Button } from "../../../library/button";
import Title from "../../../library/title";
import EmptyView from "../../../components/empty-view";
import ModalAddContent from "./modal-content";
import Configuration from "./configuration";
import useConfiguration from "../../../hooks/useConfiguration";
import ModalDeleteContent from "./configuration/modal-content";
import { useState } from "react";

const Content = () => {
  const {
    openModal: openAddModal,
    Modal: AddModal,
    closeModal: closeAddModal,
  } = useModal();

  const {
    openModal: openDeleteModal,
    Modal: DeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const { configurations, deleteConfigurationRecord } = useConfiguration();
  const [deleteId, setDeleteId] = useState("");

  const handleDeletion = () => {
    deleteConfigurationRecord(deleteId);
    closeDeleteModal();
  };

  return (
    <>
      <ContentWrapper>
        <InnerContentWrapper>
          <UpperRow>
            <UpperCol className="my-auto">
              <Title>Configurations</Title>
            </UpperCol>
            <UpperCol className="my-auto align-right">
              <Button type="button" onClick={openAddModal} variant="default">
                <i className="fa-solid fa-plus" /> New configuration
              </Button>
            </UpperCol>
          </UpperRow>
          <TableWrapper>
            {configurations?.length > 0 ? (
              configurations.map((record) => (
                <Configuration
                  key={record.id}
                  record={record}
                  openModal={() => {
                    openDeleteModal();
                    setDeleteId(record.id);
                  }}
                />
              ))
            ) : (
              <EmptyView
                title="No configurations added"
                description="You have not added any configurations yet. You can add a new configuration by clicking the button in the upper right corner."
              />
            )}
          </TableWrapper>
        </InnerContentWrapper>
      </ContentWrapper>
      <DeleteModal title="Delete configuration">
        <ModalDeleteContent
          onCancel={() => {
            closeDeleteModal();
            setDeleteId("");
          }}
          onDelete={handleDeletion}
        />
      </DeleteModal>

      <AddModal title="Add new configuration">
        <ModalAddContent afterSave={closeAddModal} />
      </AddModal>
    </>
  );
};

export default Content;
