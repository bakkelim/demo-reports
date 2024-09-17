import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useRef } from "react";

interface EditorProps {
  value: string;
  disabled?: boolean;
  name?: string;
  onChange?: any;
}

const THEME_REF = "ingesttools";

const CodeEditor: React.FC<EditorProps> = ({
  value,
  onChange,
  name = "",
  disabled = false,
}) => {
  const editorRef = useRef<any>(null);

  window.MonacoEnvironment = {
    getWorker: (_, label) => {
      if (label === "json") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker?worker",
            import.meta.url
          )
        );
      }
      return new Worker(
        new URL(
          "monaco-editor/esm/vs/editor/editor.worker?worker",
          import.meta.url
        )
      );
    },
  };

  loader.config({ monaco });

  loader.init().then((codeEditor) => {
    codeEditor.editor.defineTheme(THEME_REF, {
      base: "vs-dark",
      rules: [{ token: "", background: "fffffe" }],
      inherit: true,
      colors: {
        "editorSuggestWidget.selectedBackground": "#222222",
        "editorSuggestWidget.focusHighlightForeground": "#222222",
        "editorSuggestWidget.foreground": "#222222",
        "editor.background": "#222222",
        "editor.foreground": "#FFFFFF",
      },
    });
  });

  const handleClick = () => {
    editorRef.current?.focus();
  };

  const handleChange = (value: any) => {
    onChange({ target: { value: value, name: name } });
  };

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    fontSize: 16,
    fontFamily: "Raleway",
    fontWeight: "400",
    wordWrap: "on",
    autoClosingBrackets: "never",
    scrollbar: {
      alwaysConsumeMouseWheel: false,
    },
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: 200,
        overflow: "auto",
        borderRadius: 10,
        position: "relative",
        backgroundColor: "#222222",
        marginTop: 5,
      }}
    >
      <Editor
        value={value}
        language="json"
        theme={THEME_REF}
        onChange={handleChange}
        options={editorOptions}
      />
    </div>
  );
};

export default CodeEditor;
