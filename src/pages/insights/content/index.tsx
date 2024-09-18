import { useState } from "react";
import {
  ContentWrapper,
  Form,
  FormWrapper,
  InnerContentWrapper,
  ResponseContentWrapper,
} from "./styled";
import Title from "../../../library/title";
import Label from "../../../library/label";
import { Result, Row, perform3EdgesQuery } from "./data";
import { StyledButton } from "../../../library/button/styled";

const Content = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result>();
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [selectedIdentity, setSelectedIdentity] = useState<string>('');



  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const formData = {
      endpointUrl: e.target.endpointUrl.value,
      accessToken: e.target.accessToken.value,
    };
    const result = await perform3EdgesQuery(formData);
    setResult(result);
    setLoading(false);
  };

  return (
    <ContentWrapper>
      <InnerContentWrapper>
        <Title>Entitlement Report</Title>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="shrink">
                <StyledButton type="submit">
                  {loading ? (
                    <div className="flex gap-1 items-center">
                      <i className="fas fa-spinner fa-spin"></i>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <i className="fa-regular fa-magnifying-glass"></i>
                      Perform
                    </div>
                  )}
                </StyledButton>
              </div>
              <div>
                <details>
                  <summary className="text-white font-raleway font-bold">
                    Advanced
                  </summary>
                  <div>
                    <label
                      htmlFor="endpointUrl"
                      className="text-white font-raleway font-bold"
                    >
                      Endpoint url
                    </label>
                    <div>
                      <input
                        className="rounded-md border-none bg-[#222222] text-white w-full px-2 py-2"
                        type="text"
                        id="endpointUrl"
                        name="endpointUrl"
                        defaultValue={"https://api-ent.3edges.io/graphql"}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="accessToken"
                      className="text-white font-raleway font-bold"
                    >
                      Access token
                    </label>
                    <div>
                      <input
                        className="rounded-md border-none bg-[#222222] text-white w-full px-2 py-2"
                        type="text"
                        id="accessToken"
                        name="accessToken"
                        defaultValue={"Basic "}
                      />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </Form>
        </FormWrapper>
      </InnerContentWrapper>
      {result?.rows && (
        <>
          <div className="flex justify-end">
            <StyledButton type="button">
              <div className="flex gap-1 items-center">
                <i className="fa-regular fa-file-excel"></i>
                Download
              </div>
            </StyledButton>
          </div>

          <ResponseContentWrapper>
            <table className="text-white min-w-full">
              <thead className="border-b [text-shadow:0.05rem_0_0_currentColor]">
                <tr>
                  <th className="px-4 py-2">Identity</th>
                  <th className="px-4 py-2">Account</th>
                  <th className="px-4 py-2">Source</th>
                  <th className="px-4 py-2">Entitlement</th>
                  <th className="px-4 py-2">Type</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.length === 0 && <Label>No result</Label>}
                {result.rows.map((row: Row, index: number) => (
                  <>
                    <tr
                      key={index}
                      onClick={() =>
                        setExpandedIndex(index === expandedIndex ? -1 : index)
                      }
                      className="cursor-pointer even:bg-[#343a40] hover:bg-gray-700"
                    >
                      <td className="px-4 py-2">{row.identity}</td>
                      <td className="px-4 py-2">{row.account}</td>
                      <td className="px-4 py-2">{row.source}</td>
                      <td className="px-4 py-2">{row.entitlement}</td>
                      <td className="px-4 py-2">{row.entitlementType}</td>
                    </tr>
                    {expandedIndex === index && (
                      <tr>
                        <td colSpan={5} className="px-4 py-2">
                          {/* Render additional details here */}
                          <div>
                            <p>
                              <strong>Entitlement Description:</strong>
                            </p>
                            <p>{row.description}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </ResponseContentWrapper>
        </>
      )}
    </ContentWrapper>
  );
};

export default Content;
