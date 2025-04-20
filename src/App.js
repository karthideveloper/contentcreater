import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { toPng } from "html-to-image";

import { solarizedLight } from "@uiw/codemirror-theme-solarized";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark } from "@uiw/codemirror-theme-github";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { aura } from "@uiw/codemirror-theme-aura";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";


const languages = {
  javascript: { label: "JavaScript", ext: javascript },
  python: { label: "Python", ext: python },
  html: { label: "HTML", ext: html },
  css: { label: "CSS", ext: css },
};

const themes = {
  dracula: { label: "Dracula", color: "#282a36", cmTheme: dracula },
  solarized: { label: "Solarized", color: "#fdf6e3", cmTheme: solarizedLight },
  sublime: { label: "Sublime", color: "#23241f", cmTheme: sublime },
  dark: {
    label: "Dark",
    color: "#1e1e1e",
    cmTheme: vscodeDark, // CodeMirror dark theme
  },
  light: {
    label: "Light",
    color: "#f5f5f5",
    cmTheme: githubDark, // You can use githubLight here too
  },
  amber: {
    label: "Amber",
    color: "#ffbf66",
    cmTheme: aura, // matches warm tones
  },
  violet: {
    label: "Violet",
    color: "#CF97EB",
    cmTheme: tokyoNight, // matches purple-ish feel
  },
  blue: {
    label: "Blue",
    color: "#77B2F7",
    cmTheme: dracula, // best matching among dark themes
  },
};

const fonts = [
  "Fira Code",
  "Courier New",
  "Source Code Pro",
  "Monaco",
  "Consolas",
];

function App() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("dracula");
  const [fontFamily, setFontFamily] = useState("Fira Code");
  const [fontSize, setFontSize] = useState(14);
  const [code, setCode] = useState("// Start typing your code here...");
  const editorRef = useRef(null);

  const downloadImage = () => {
    if (!editorRef.current) return;
    toPng(editorRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "code-snippet.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error exporting:", err);
      });
  };

  return (
    <div
      style={{
        padding: 20,
        background: "#eee",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>🎨 Code Snippet Editor</h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 15,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          {Object.entries(languages).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTheme(e.target.value)} value={theme}>
          {Object.entries(themes).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setFontFamily(e.target.value)}
          value={fontFamily}
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={10}
          max={28}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          placeholder="Font Size"
        />

        <button onClick={downloadImage}>📸 Export PNG</button>
      </div>

      <div
        ref={editorRef}
        id="your-code-container"
        style={{
          backgroundColor: themes[theme].color,
          padding: "2rem",
          borderRadius: "12px",
          fontFamily,
          fontSize: `${fontSize}px`,
          width: "40vw",
          maxWidth: "700px",
        }}
      >
        <CodeMirror
          value={code}
          height="auto"
          minHeight="200px"
          extensions={[languages[language].ext()]}
          onChange={(value) => setCode(value)}
          theme={themes[theme].cmTheme}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            highlightActiveLine: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
