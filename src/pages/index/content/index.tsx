import { useState } from "react";
import {
  ContentWrapper,
  Form,
  FormWrapper,
  InnerContentWrapper,
} from "./styled";
import Title from "../../../library/title";
import useConfiguration from "../../../hooks/useConfiguration";
import { StyledButton } from "../../../library/button/styled";
import CodeEditor from "../../../library/code-editor";
import { performArrowDataIngest } from "./data";

const Content = () => {
  const { configurations } = useConfiguration();
  const [loading, setLoading] = useState(false);
  const [editorData, setEditorData] = useState("");

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      credential: e.target.credential.value,
      data: editorData,
      externalId: e.target.externalId.value || "external_id",
      action: e.target.action.value,
    };
    await performArrowDataIngest(formData);
    setLoading(false);
  };

  const editorOnChange = (e: any) => {
    const data = e.target.value;
    setEditorData(data);
  };

  return (
    <ContentWrapper>
      <InnerContentWrapper>
        <Title>Arrows Ingestion</Title>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="credential"
                  className="text-white font-raleway font-bold"
                >
                  Configuration
                </label>
                <div>
                  <select
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    id="credential"
                    name="credential"
                  >
                    {configurations.map((t) => (
                      <option key={t.id} value={t.value}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="data"
                  className="text-white font-raleway font-bold"
                >
                  Data
                </label>
                <CodeEditor value={""} name="data" onChange={editorOnChange} />
              </div>

              <div>
                <label
                  htmlFor="externalId"
                  className="text-white font-raleway font-bold"
                >
                  External ID
                </label>
                <div>
                  <input
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    type="text"
                    id="externalId"
                    name="externalId"
                    placeholder="defaults to external_id if not provided"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="action"
                  className="text-white font-raleway font-bold"
                >
                  Ingest action
                </label>
                <div>
                  <select
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    id="action"
                    name="action"
                  >
                    <option value="UPSERT">UPSERT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>

              <div className="shrink mt-4">
                <StyledButton type="submit">
                  {loading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Ingesting data...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-upload"></i>
                      Ingest from Arrows.app
                    </div>
                  )}
                </StyledButton>
              </div>
            </div>
          </Form>
        </FormWrapper>
      </InnerContentWrapper>
    </ContentWrapper>
  );
};

export default Content;
