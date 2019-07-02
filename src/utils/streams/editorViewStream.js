import subscribeOnUpdates from "../subscribe-on-updates";

function serializeEditorState(editorState) {
  return {}; // TODO: implement
}
function serializeTransaction(tr) {
  return {}; // TODO: implement
}

export default class EditorViewStream {
  constructor(editorView) {
    this._listeners = [];
    subscribeOnUpdates(editorView, this.__handlerEditorViewUpdate);
  }

  __handlerEditorViewUpdate = (tr, oldState, newState) => {
    const serializedTr = serializeTransaction(tr);
    const serializedOldState = serializeEditorState(oldState);
    const serializedNewState = serializeEditorState(newState);

    this._listeners.forEach(listener => listener(tr, oldState, newState));
  };

  subscribe(listener) {
    this._listeners.push(listener);

    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(unsubscribeListener) {
    this._listeners = this._listeners.filter(
      listener => listener === unsubscribeListener
    );
  }
}
