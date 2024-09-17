import { useEffect, useState } from "react";
import {
  ContentWrapper,
  Form,
  FormWrapper,
  InnerContentWrapper,
  NodeCard,
  NodeType,
  ResponseContentWrapper,
} from "./styled";
import Title from "../../../library/title";
import useConfiguration from "../../../hooks/useConfiguration";
import useResources, { Node } from "../../../hooks/useResources";
import Label from "../../../library/label";
import {
  IsAuthorizedResult,
  Result,
  WhatAuthorizedResult,
  WhoAuthorizedResult,
  perfomIsAuthorized,
  perfomWhatAuthorized,
  perfomWhoAuthorized,
} from "./data";
import { StyledButton } from "../../../library/button/styled";

const Content = () => {
  const Is = "is";
  const What = "what";
  const Who = "who";

  const { configurations } = useConfiguration();
  const { resources, fetchResources } = useResources();
  const [modifiedResources, setModifiedResources] = useState<Node[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Result>();
  const [submitAction, setSubmitAction] = useState("");
  const [tab, setTab] = useState(Is);

  const handleCredentialChange = async (e: any) => {
    const credential = e.target.value;
    fetchResources(credential);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      credential: e.target.credential.value,
      subject: resources.find((n) => n.id === e.target.subject.value),
      action: e.target.action.value,
      resource: resources.find((n) => n.id === e.target.resource.value),
      inputParams: e.target.inputParams.value,
      tags: e.target.tags.value,
    };
    if (submitAction === Is) {
      setIsLoading(true);
      const result = await perfomIsAuthorized(formData);
      setResult(result);
      setIsLoading(false);
    }
    if (submitAction === What) {
      setIsLoading(true);
      const result = await perfomWhatAuthorized(formData);
      setResult(result);
      setIsLoading(false);
    }
    if (submitAction === Who) {
      setIsLoading(true);
      const result = await perfomWhoAuthorized(formData);
      setResult(result);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (configurations.length > 0) {
      fetchResources(configurations[0]?.value);
    }
  }, [configurations, fetchResources]);

  useEffect(() => {
    setModifiedResources(resources.filter((n) => n.type !== "Consent"));
  }, [resources]);

  useEffect(() => {
    if (tab === Is) {
      setSubmitAction(Is);
      setModifiedResources(resources.filter((n) => n.type !== "Consent"));
    }
    if (tab === What) {
      setSubmitAction(What);
      const types = resources.filter((n) => n.type !== "Consent").reduce((acc: Node[], curr: Node) => {
        if (acc.find((n) => n.type === curr.type)) {
          return acc;
        }
        return [...acc, curr];
      }, [])
      setModifiedResources(types);
    }
    if (tab === Who) {
      setSubmitAction(Who);
      setModifiedResources(resources.filter((n) => n.type !== "Consent"));
    }
  }, [tab, resources]);

  return (
    <ContentWrapper>
      <InnerContentWrapper>
        <Title>Authorization</Title>

        <div className="mb-4 flex space-x-4 p-2 rounded-lg shadow-md bg-[#1b1b1b]">
          < button
            className={`${
              tab === Is ? "bg-gradient-to-r from-[#554AD5] to-[#6862AD]" : ""
            } text-white font-raleway font-semibold flex-1 px-3 py-3 rounded-md bg-[#222222] transition-all duration-300`}
            onClick={() => setTab(Is)}
          >
            IsAuthorized
          </button>
          <button
            className={`${
              tab === What ? "bg-gradient-to-r from-[#554AD5] to-[#6862AD]" : ""
            } text-white font-raleway font-semibold flex-1 px-3 py-3 rounded-md bg-[#222222] transition-all duration-300`}
            onClick={() => setTab(What)}
          >
            WhatAuthorized
          </button>
          <button
            className={`${
              tab === Who ? "bg-gradient-to-r from-[#554AD5] to-[#6862AD]" : ""
            } text-white font-raleway font-semibold flex-1 px-3 py-3 rounded-md bg-[#222222] transition-all duration-300`}
            onClick={() => setTab(Who)}
          >
            WhoAuthorized
          </button>
        </div>

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
              <div hidden={tab === Who}>
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
                  htmlFor="action"
                  className="text-white font-raleway font-bold"
                >
                  Action
                </label>
                <div>                  
                  <input
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    type="text"
                    id="action"
                    name="action"
                  />
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="resource"
                  className="text-white font-raleway font-bold"
                >
                  Resource
                </label>
                <div>
                  <select
                    className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                    id="resource"
                    name="resource"
                  >
                    {modifiedResources
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {tab === What
                            ? t.type
                            : `${t.type} - ${t.externalId}`}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <details>
                  <summary className="text-white font-raleway font-bold">
                    Advanced
                  </summary>
                  <div>
                    <label
                      htmlFor="inputParams"
                      className="text-white font-raleway font-bold"
                    >
                      Input params
                    </label>
                    <div>
                      <input
                        className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                        type="text"
                        id="inputParams"
                        name="inputParams"
                        placeholder="key1=value1,key2=value2,..."
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="tags"
                      className="text-white font-raleway font-bold"
                    >
                      Policy categories
                    </label>
                    <div>
                      <input
                        className="rounded-md border-none bg-[#222222] text-white w-full px-3 py-3"
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder="tag1,tag2,..."
                      />
                    </div>
                  </div>
                </details>
              </div>

              <div className="flex gap-2 mt-4">
                <StyledButton type="submit">
                  {isLoading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Authorizing...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-circle-question"></i>
                      Authorize
                    </div>
                  )}
                </StyledButton>
              </div>
            </div>
          </Form>
        </FormWrapper>
      </InnerContentWrapper>
      {result?.isAuthorized && (
        <>
          <IsAuthorized result={result.isAuthorized} />
          {/* <pre className="text-white">{JSON.stringify(isResult.decision, null, 2)}</pre> */}
        </>
      )}
      {result?.whatAuthorized && (
        <>
          <WhatAuthorized result={result.whatAuthorized} />
          {/* <pre className="text-white">{JSON.stringify(isResult.decision, null, 2)}</pre> */}
        </>
      )}
      {result?.whoAuthorized && (
        <>
          <WhoAuthorized result={result.whoAuthorized} />
          {/* <pre className="text-white">{JSON.stringify(isResult.decision, null, 2)}</pre> */}
        </>
      )}
    </ContentWrapper>
  );
};

const IsAuthorized = ({ result }: { result: IsAuthorizedResult }) => {
  return (
    <ResponseContentWrapper>
      <NodeCard>
        <NodeType className="px-3">Result</NodeType>
        {result.allowed ? (
          <div className="flex gap-1 justify-center">
            <i className="fa-solid text-green-400/50 text-7xl fa-thumbs-up"></i>
          </div>
        ) : (
          <div className="flex gap-1 justify-center">
            <i className="fa-solid text-red-400/50 text-7xl fa-thumbs-down"></i>
          </div>
        )}
      </NodeCard>
    </ResponseContentWrapper>
  );
};

const WhatAuthorized = ({ result }: { result: WhatAuthorizedResult }) => {
  return (
    <ResponseContentWrapper>
      {result.externalIds.length === 0 && <Label>No result</Label>}
      {result.externalIds.map((externalId: string, key: number) => (
        <div
          className="flex flex-column gap-2 p-3 rounded-3xl bg-[#1b1b1b] w-[350px]"
          key={`NODE-${key}`}
        >
          <div className="flex gap-2 justify-center">
            <NodeType className="px-3" key={key}>
              {result.type}
            </NodeType>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2 font-raleway font-medium">
              <div className="text-[#ffaf4d]">external_id:</div>
              <div className="text-white">{externalId}</div>
            </div>
          </div>
          {/* <pre className="text-white">{JSON.stringify(node, null, 2)}</pre> */}
        </div>
      ))}
    </ResponseContentWrapper>
  );
};

const WhoAuthorized = ({ result }: { result: WhoAuthorizedResult }) => {
  return (
    <ResponseContentWrapper>
      {result.externalIds.length === 0 && <Label>No result</Label>}
      {result.externalIds.map((externalId: string, key: number) => (
        <div
          className="flex flex-column gap-2 p-3 rounded-3xl bg-[#1b1b1b] w-[350px]"
          key={`NODE-${key}`}
        >
          <div className="flex gap-2 justify-center">
            <NodeType className="px-3" key={key}>
              {result.type}
            </NodeType>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2 font-raleway font-medium">
              <div className="text-[#ffaf4d]">external_id:</div>
              <div className="text-white">{externalId}</div>
            </div>
          </div>
          {/* <pre className="text-white">{JSON.stringify(node, null, 2)}</pre> */}
        </div>
      ))}
    </ResponseContentWrapper>
  );
};

export default Content;
