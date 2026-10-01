/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { describe, expect, test } from "vitest";
import { createEditor, h, p } from "../../../../test-utils/index.js";
import { SearchReplace } from "../search-replace.js";

function createSearchEditor() {
  const editorElement = h("div");
  const { editor } = createEditor({
    element: editorElement,
    initialContent: p(["foo bar foo baz foo"]).outerHTML,
    extensions: {
      searchreplace: SearchReplace
    }
  });

  editor.commands.search("foo");
  return editor;
}

describe("search-replace keyboard shortcuts", () => {
  test("moves to next and previous results with Mod+G", () => {
    const editor = createSearchEditor();

    expect(editor.storage.searchreplace.selectedIndex).toBe(0);

    editor.view.dom.dispatchEvent(
      new KeyboardEvent("keydown", { key: "g", shiftKey: true, ctrlKey: true })
    );
    expect(editor.storage.searchreplace.selectedIndex).toBe(2);

    editor.view.dom.dispatchEvent(
      new KeyboardEvent("keydown", { key: "g", ctrlKey: true })
    );
    expect(editor.storage.searchreplace.selectedIndex).toBe(0);

    editor.destroy();
  });

  test("moves to next and previous results with F3", () => {
    const editor = createSearchEditor();

    editor.view.dom.dispatchEvent(new KeyboardEvent("keydown", { key: "F3" }));
    expect(editor.storage.searchreplace.selectedIndex).toBe(1);

    editor.view.dom.dispatchEvent(
      new KeyboardEvent("keydown", { key: "F3", shiftKey: true })
    );
    expect(editor.storage.searchreplace.selectedIndex).toBe(0);

    editor.destroy();
  });
});
