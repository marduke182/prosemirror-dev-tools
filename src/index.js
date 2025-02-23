import "ie-array-find-polyfill";
import objectAssign from "es6-object-assign";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "unstated";
import DevTools from "./dev-tools";
import EditorStateContainer from "./state/editor";
import EditorViewStream from "./utils/streams/editorViewStream";

const DEVTOOLS_CLASS_NAME = "__prosemirror-dev-tools__";

objectAssign.polyfill();

function createPlace() {
  let place = document.querySelector(`.${DEVTOOLS_CLASS_NAME}`);

  if (!place) {
    place = document.createElement("div");
    place.className = DEVTOOLS_CLASS_NAME;
    document.body.appendChild(place);
  } else {
    ReactDOM.unmountComponentAtNode(place);
    place.innerHTML = "";
  }

  return place;
}

function applyDevTools(editorView, props) {
  const place = createPlace();
  const editorState = new EditorStateContainer(
    new EditorViewStream(editorView),
    props
  );

  ReactDOM.render(
    <Provider inject={[editorState]}>
      <DevTools />
    </Provider>,
    place
  );
}

export default applyDevTools;
export { applyDevTools };
