import Label from "../../../library/label";
import Input from "../../../library/input";
import CodeEditor from "../../../library/code-editor";
import { Field } from "./styled";

export const QUERY_FIELDS = [
  {
    name: "title",
    renderInput: (data: any, onChange: any) => (
      <Field>
        <Label>Title</Label>
        <Input value={data.title} name="title" onChange={onChange} />
      </Field>
    ),
  },
  {
    name: "value",
    renderInput: (data: any, onChange: any) => (
      <Field>
        <Label>Query</Label>
        <CodeEditor value={data.value} name="value" onChange={onChange} />
      </Field>
    ),
  },
];
