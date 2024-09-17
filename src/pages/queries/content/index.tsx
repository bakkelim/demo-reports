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
import Query from "./query";
import useQuery from "../../../hooks/useQuery";
import ModalDeleteContent from "./query/modal-content";
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

  const { queries, deleteQuery } = useQuery();
  const [deleteId, setDeleteId] = useState("");

  const handleDeletion = () => {
    deleteQuery(deleteId);
    closeDeleteModal();
  };

  return (
    <>
      <ContentWrapper>
        <InnerContentWrapper>
          <UpperRow>
            <UpperCol className="my-auto">
              <Title>Queries</Title>
            </UpperCol>
            <UpperCol className="my-auto align-right">
              <Button type="button" onClick={openAddModal} variant="default">
                <i className="fa-solid fa-plus" /> New query
              </Button>
            </UpperCol>
          </UpperRow>
          <TableWrapper>
            {queries?.length > 0 ? (
              queries.map((record) => (
                <Query
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
                title="No queries added"
                description="You have not added any queries yet. You can add a new query by clicking the button in the upper right corner."
              />
            )}
          </TableWrapper>
        </InnerContentWrapper>
      </ContentWrapper>
      <DeleteModal title="Delete query">
        <ModalDeleteContent
          onCancel={() => {
            closeDeleteModal();
            setDeleteId("");
          }}
          onDelete={handleDeletion}
        />
      </DeleteModal>

      <AddModal title="Add new query">
        <ModalAddContent afterSave={closeAddModal} />
      </AddModal>
    </>
  );
};

export default Content;
