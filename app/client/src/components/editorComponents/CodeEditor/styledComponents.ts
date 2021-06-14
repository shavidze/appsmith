import styled, { createGlobalStyle } from "styled-components";
import {
  CodeEditorBorder,
  EditorSize,
  EditorTheme,
} from "components/editorComponents/CodeEditor/EditorConfig";
import { Skin, Theme } from "constants/DefaultTheme";
import { Colors } from "constants/Colors";

export const HintStyles = createGlobalStyle<{
  editorTheme: EditorTheme;
  theme: Theme;
}>`
  .CodeMirror-hints {
    position: absolute;
    z-index: 20;
    overflow: hidden;
    list-style: none;
    margin-top: ${(props) => props.theme.spaces[3]}px;
    padding: 0px 0px;
    font-family: monospace;
    max-height: 20em;
    overflow-y: auto;
    background: ${(props) =>
      props.editorTheme === EditorTheme.LIGHT ? "#FAFAFA" : "#262626"};
    box-shadow: 0px 12px 28px -6px rgba(0, 0, 0, 0.32);
    border-radius: 0px;
  }

  .CodeMirror-hint {
    height: 24px;
    color: ${(props) =>
      props.editorTheme === EditorTheme.LIGHT ? "#090707" : "#FFFFFF"};
    cursor: pointer;
    display: flex;
    min-width: 220px;
    width: auto;
    align-items: center;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.24px;
    &:hover {
      background: ${(props) =>
        props.editorTheme === EditorTheme.LIGHT ? "#6A86CE" : "#157A96"};
      border-radius: 0px;
      color: #fff;
      &:after {
        color: #fff;
      }
    }
  }

  .CodeMirror-command-header {
    padding: 0 8px;
    color: #716e6e;
    pointer-events: none !important;
    font-weight: 500;
    font-family: ${(props) => props.theme.fonts.text};
  }

  .CodeMirror-commands {
    color: #4b4848;
    font-weight: 500;
    position: relative;
    padding: 0 8px !important;
    height: 25px;
    font-family: ${(props) => props.theme.fonts.text};
    font-style: normal;
    &:hover, &.CodeMirror-hint-active {
      svg {
        path {
          fill: #ffffff;
        }
      }
      .shortcut {
        color: #ffffff;
      }
    }
    .command-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
    }
    .command {
      display: flex;
      align-items: center;
      img {
        height: 12px;
        width: 12px;
        margin-right: 7px;
      }
    }
    .shortcut {
      font-style: italic;
      font-size: 10px;
      color: #a9a7a7;
      margin-left: auto;
    }
  }


  .CodeMirror-hint-header {
    padding-left: 8px;
    color: #4B4848;
    pointer-events: none !important;
    font-weight: 600;
  }

  .datasource-hint {
    padding: 10px 20px 10px 10px !important;
    display: block;
    width: 500px;
    height: 32px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: #FAFAFA;
    color: black;
    &.custom {
      height: unset;
      background: #ebebeb;
      width: 600px;
      &:hover{
        background: #ffffff;
        color: black;
      }
      &.CodeMirror-hint-active {
        background: #ffffff;
      }
    }

    &.invalid {
      color: ${(props) => props.theme.colors.errorMessage};
    }
  }
  .CodeMirror-Tern-completion {
    display: flex;
    padding-left: ${(props) => props.theme.spaces[11]}px !important;
    &:hover{
      background: ${(props) =>
        props.editorTheme === EditorTheme.LIGHT ? "#6A86CE" : "#157A96"};
    }
  }
  .CodeMirror-Tern-completion:before {
    left: 7px;
    bottom: 6px;
    height: 12px;
    width: 12px;
    border-radius: 0;
    font-size: 10px;
    line-height: 12px;
    font-weight: normal;
    text-align: center;
    color: ${(props) => props.theme.colors.codeMirror.dataType.shortForm};
    margin-right: ${(props) => props.theme.spaces[13]}px;
  }
  .CodeMirror-Tern-completion-fn:before {
    background: ${(props) => props.theme.colors.dataTypeBg.function};
  }
  .CodeMirror-Tern-completion-object:before {
    background: ${(props) => props.theme.colors.dataTypeBg.object};
  }
  .CodeMirror-Tern-completion-unknown:before {
    background: ${(props) => props.theme.colors.dataTypeBg.unknown};
  }
  .CodeMirror-Tern-completion-array:before {
    background: ${(props) => props.theme.colors.dataTypeBg.array};
  }
  .CodeMirror-Tern-completion-number:before, .CodeMirror-Tern-completion-string:before, .CodeMirror-Tern-completion-bool:before {
    background: ${(props) => props.theme.colors.dataTypeBg.number};
  }
  .CodeMirror-Tern-completion:after {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    padding-right: 10px;
    font-style: italic;
    font-weight: normal;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: -0.24px;
    padding-left: 10px;
    color: ${(props) => props.theme.colors.codeMirror.dataType.fullForm};
  }
  .CodeMirror-Tern-completion-fn:after {
    content: "Function";
  }
  .CodeMirror-Tern-completion-object:after {
    content: "Object";
  }
  .CodeMirror-Tern-completion-unknown:after {
    content: "Unknown";
  }
  .CodeMirror-Tern-completion-array:after {
    content: "Array";
  }
  .CodeMirror-Tern-completion-number:after {
    content: "Number";
  }
  .CodeMirror-Tern-completion-string:after {
    content: "String";
  }
  .CodeMirror-Tern-completion-bool:after {
    content: "Boolean";
  }
  .CodeMirror-Tern-tooltip {
    z-index: 20 !important;
  }
  li.CodeMirror-hint-active {
    background: ${(props) =>
      props.theme.colors.codeMirror.background.hoverState};
    border-radius: 0px;
    color: #fff;
    &:after {
      color: #fff;
    }
  }
  .CodeMirror-Tern-hint-doc {
    display: none;
    &.visible {
      display: block;
      background-color: ${(props) =>
        props.editorTheme === EditorTheme.DARK ? "#23292e" : "#fff"} !important;
      color: ${(props) =>
        props.editorTheme === EditorTheme.DARK
          ? "#F4F4F4"
          : "#1E242B"} !important;
      max-height: 150px;
      width: 250px;
      font-size: 12px;
      padding: 5px !important;
      border: 1px solid !important;
      border-color: ${(props) =>
        props.editorTheme === EditorTheme.DARK
          ? "#23292e"
          : "#DEDEDE"} !important;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12) !important;
      overflow: scroll;
    }

  }
`;

const getBorderStyle = (
  props: { theme: Theme } & {
    editorTheme?: EditorTheme;
    hasError: boolean;
    size: EditorSize;
    isFocused: boolean;
    disabled?: boolean;
  },
) => {
  if (props.hasError) return props.theme.colors.error;
  if (props.editorTheme !== EditorTheme.DARK) {
    if (props.isFocused) return props.theme.colors.inputActiveBorder;
    return props.theme.colors.border;
  }
  return "transparent";
};

const editorBackground = (theme?: EditorTheme) => {
  let bg = "#FAFAFA";
  switch (theme) {
    case EditorTheme.DARK:
      bg = "#1A191C";
      break;
    case EditorTheme.LIGHT:
      bg = "#FAFAFA";
      break;
  }
  return bg;
};

export const EditorWrapper = styled.div<{
  editorTheme?: EditorTheme;
  hasError: boolean;
  isFocused: boolean;
  disabled?: boolean;
  size: EditorSize;
  height?: string | number;
  borderLess?: boolean;
  isNotHover?: boolean;
  border?: CodeEditorBorder;
  hoverInteraction?: boolean;
  fill?: boolean;
}>`
  width: 100%;
  ${(props) =>
    props.size === EditorSize.COMPACT && props.isFocused
      ? `
  z-index: 5;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  `
      : `position: relative;`}
  min-height: 32px;
  height: ${(props) => props.height || "auto"};
  background-color: ${(props) => editorBackground(props.editorTheme)};
  background-color: ${(props) => props.disabled && "#eef2f5"};
  border-color: ${getBorderStyle};
  display: flex;
  flex: 1;
  flex-direction: row;
  text-transform: none;
  ${(props) =>
    props.hoverInteraction
      ? `
  &:hover {
    && {
      .cm-s-duotone-dark.CodeMirror {
        cursor: pointer;
        border-radius: 0px;
        background: ${
          !props.isNotHover
            ? Colors.SHARK2
            : props.isFocused
            ? Colors.NERO
            : Colors.BALTIC_SEA
        };
      }
      .cm-s-duotone-light.CodeMirror {
        cursor: pointer;
        border-radius: 0px;
        background: ${
          !props.isNotHover
            ? Colors.Gallery
            : props.isFocused
            ? Colors.MERCURY
            : Colors.WHITE
        };
      }
    }
  }`
      : null};
  && {
    .CodeMirror-cursor {
      border-right: none;
      border-left-width: 2px;
      border-left-color: ${(props) =>
        props.editorTheme === EditorTheme.DARK
          ? props.theme.colors.textOnDarkBG
          : props.theme.colors.textDefault} !important;
    }
    .cm-s-duotone-light.CodeMirror {
      border-radius: 0px;
      ${(props) =>
        props.border === "none"
          ? `border: 0px`
          : props.border === "bottom-side"
          ? `border-bottom: 1px solid ${Colors.MERCURY}`
          : `border: 1px solid ${Colors.MERCURY}`};
      background: ${(props) =>
        props.isFocused || props.fill ? Colors.MERCURY : "#FAFAFA"};
      color: ${Colors.CHARCOAL};
      & {
        span.cm-operator {
          color: ${(props) => props.theme.colors.textDefault};
        }
      }
    }
    .cm-s-duotone-light .CodeMirror-gutters {
      background: ${Colors.Gallery};
    }
    .cm-s-duotone-dark.CodeMirror {
      border-radius: 0px;
      ${(props) =>
        props.border === "none"
          ? `border: 0px`
          : props.border === "bottom-side"
          ? `border-bottom: 1px solid ${Colors.NERO}`
          : `border: 1px solid ${Colors.NERO}`};
      background: ${(props) =>
        props.isFocused || props.fill ? Colors.NERO : "#262626"};
      color: ${Colors.LIGHT_GREY};
    }
    .cm-s-duotone-light .CodeMirror-linenumber,
    .cm-s-duotone-dark .CodeMirror-linenumber {
      color: ${Colors.DOVE_GRAY};
    }
    .cm-s-duotone-dark .CodeMirror-gutters {
      background: ${Colors.SHARK2};
    }
    .binding-brackets {
      ${(props) =>
        props.hasError
          ? `
      color: ${props.theme.colors.error};
      `
          : `color: ${
              props.editorTheme === EditorTheme.DARK
                ? props.theme.colors.bindingTextDark
                : props.theme.colors.bindingText
            };`}
      font-weight: 700;
    }
    .CodeMirror-matchingbracket {
      text-decoration: none;
      color: #ffd600 !important;
      background-color: #a74444;
    }
    .datasource-highlight {
      background: ${(props) =>
        props.editorTheme === EditorTheme.DARK ? "#002B54" : "#e7f3ff"};
      border: 1px solid
        ${(props) =>
          props.editorTheme === EditorTheme.DARK ? "#10569A" : "#69b5ff"};
      padding: 2px;
      border-radius: 2px;
      margin-right: 2px;
    }
    .CodeMirror {
      flex: 1;
      line-height: 21px;
      z-index: 0;
      border-radius: 4px;
      height: auto;
    }
    ${(props) =>
      props.disabled &&
      `
    .CodeMirror-cursor {
      display: none !important;
    }
    `}
    .CodeMirror pre.CodeMirror-placeholder {
      color: ${(props) =>
        props.theme.colors.apiPane.codeEditor.placeholderColor};
    }
    ${(props) =>
      props.size === EditorSize.COMPACT &&
      `
      .CodeMirror-hscrollbar {
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    `}
  }
  && {
    .CodeMirror-lines {
      padding: ${(props) => props.theme.spaces[2]}px 0px;
      background-color: ${(props) => props.disabled && "#eef2f5"};
      cursor: ${(props) => (props.disabled ? "not-allowed" : "text")};
    }
  }
  .bp3-popover-target {
    padding-right: 10px;
    padding-top: 5px;
  }
  .leftImageStyles {
    width: 20px;
    height: 20px;
    margin: 5px;
  }
  .linkStyles {
    margin: 5px;
    margin-right: 11px;
  }
  .CodeMirror-foldmarker {
    color: inherit;
    text-shadow: none;
    font: inherit;
  }
`;

export const IconContainer = styled.div`
  border-radius: 4px 0 0 4px;
  margin: 0;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eef2f5;
  svg {
    height: 20px;
    width: 20px;
    path {
      fill: #979797;
    }
  }
`;

export const DynamicAutocompleteInputWrapper = styled.div<{
  skin: Skin;
  theme: Theme;
  isActive: boolean;
  isNotHover: boolean;
  isError: boolean;
}>`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  border: 1px solid ${(props) => (!props.isError ? "transparent" : "red")};
  > span:first-of-type {
    width: 30px;
    position: absolute;
    right: 0px;
  }
  &:hover {
    .lightning-menu {
      background: ${(props) => (!props.isNotHover ? "#090707" : "")};
      svg {
        path,
        circle {
          fill: ${(props) =>
            !props.isNotHover
              ? props.skin === Skin.DARK
                ? Colors.BLUE_CHARCOAL
                : Colors.ALTO2
              : ""};
        }
      }
    }
  }
  border-radius: 0px;
  .lightning-menu {
    z-index: 1 !important;
  }
  .commands-button {
    z-index: 2;
    width: 24px;
    height: 24px;
    background: transparent;
    color: #f86a2b;
    border: none;
    font-weight: bold;
    font-size: 15px;
    font-style: italic;
    padding: 0 0 3px;
    &:hover {
      background: #f86a2b;
      color: white;
    }
  }
`;
