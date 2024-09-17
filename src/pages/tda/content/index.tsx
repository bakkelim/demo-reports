import { useEffect, useState } from "react";
import {
  ContentWrapper,
  Form,
  FormWrapper,
  InnerContentWrapper,
  NodeType,
  ResponseContentWrapper,
} from "./styled";
import Title from "../../../library/title";
import useConfiguration from "../../../hooks/useConfiguration";
import useResources from "../../../hooks/useResources";
import Label from "../../../library/label";
import { Property, ReadResult, grant, read, revoke, list } from "./data";
import { StyledButton } from "../../../library/button/styled";

const Content = () => {
  const { configurations } = useConfiguration();
  const { resources, fetchResources } = useResources();
  const [readLoading, setReadLoading] = useState(false);
  const [grantLoading, setGrantLoading] = useState(false);
  const [revokeLoading, setRevokeLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [readResult, setReadResult] = useState<ReadResult>();
  // Define your state variable
  const [action, setAction] = useState("");

  const handleCredentialChange = async (e: any) => {
    const credential = e.target.value;
    fetchResources(credential);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      credential: e.target.credential.value,
      subject: e.target.subject.value,
      consentId: e.target.consentId.value,
    };
    if (action === "read") {
      setReadLoading(true);
      const result = await read(formData);
      setReadResult(result);
      setReadLoading(false);
    }
    if (action === "grant") {
      setGrantLoading(true);
      await grant(formData);
      setGrantLoading(false);
    }
    if (action === "revoke") {
      setRevokeLoading(true);
      await revoke(formData);
      setRevokeLoading(false);
    }
    if (action === "list") {
      setListLoading(true);
      const result = await list(formData);
      setReadResult(result);
      setListLoading(false);
    }
  };

  useEffect(() => {
    if (configurations.length > 0) {
      fetchResources(configurations[0]?.value);
    }
  }, [configurations, fetchResources]);

  return (
    <ContentWrapper>
      <InnerContentWrapper>
        <Title>Trusted Data Access</Title>
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
                    onChange={handleCredentialChange}
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
                  htmlFor="subject"
                  className="text-white font-raleway font-bold"
                >
                  Subject
                </label>
                <div>
                  <select
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    id="subject"
                    name="subject"
                  >
                    {resources
                      .filter((n) => n.isIdentity)
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.type} - {t.externalId}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="consentId"
                  className="text-white font-raleway font-bold"
                >
                  ConsentId
                </label>
                <div>
                  <input
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    type="text"
                    id="consentId"
                    name="consentId"
                  />
                </div>
              </div>

              <div className="flex gap-5 mt-4">
                <StyledButton type="submit" onClick={() => setAction("read")}>
                  {readLoading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Reading...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-circle-question"></i>
                      Read
                    </div>
                  )}
                </StyledButton>
                <div className="flex gap-2">
                <StyledButton type="submit" onClick={() => setAction("grant")}>
                  {grantLoading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Granting...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-circle-plus"></i>
                      Grant
                    </div>
                  )}
                </StyledButton>
                <StyledButton type="submit" onClick={() => setAction("revoke")}>
                  {revokeLoading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Revoking...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-circle-minus"></i>
                      Revoke
                    </div>
                  )}
                </StyledButton>
                <StyledButton type="submit" onClick={() => setAction("list")}>
                  {listLoading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Fetching...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-list"></i>
                      List
                    </div>
                  )}
                </StyledButton>
                </div>
              </div>
            </div>
          </Form>
        </FormWrapper>
      </InnerContentWrapper>
      {readResult?.properties && (
        <ResponseContentWrapper>
          {readResult.properties?.length === 0 && <Label>No data</Label>}
          {readResult.properties?.map((p: Property, key: number) => (
            <div
              className="flex flex-column gap-2 p-3 rounded-3xl bg-[#1b1b1b] w-[350px]"
              key={`NODE-${key}`}
            >
              <NodeType>{p.type}</NodeType>
              <div className="flex gap-2 font-raleway font-medium">
                <div className="text-[#ffaf4d]">{p.type}:</div>
                <div className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
                  {p.value}
                </div>
              </div>
              {/* <pre className="text-white">{JSON.stringify(p, null, 2)}</pre> */}
            </div>
          ))}
        </ResponseContentWrapper>
      )}
    </ContentWrapper>
  );
};

export default Content;
