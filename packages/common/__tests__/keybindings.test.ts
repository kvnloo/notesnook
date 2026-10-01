/*
This file is part of the Notesnook project (https://notesnook.com/)

Copyright (C) 2023 Streetwriters (Private) Limited

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
*/

import { describe, expect, test } from "vitest";
import { getKeybinding } from "../src/utils/keybindings.js";

describe("platform keybindings", () => {
  test("keeps Control+Tab for desktop tab navigation on macOS", () => {
    expect(getKeybinding("nextTab", true, true)).toEqual(["ctrl+tab"]);
    expect(getKeybinding("previousTab", true, true)).toEqual([
      "ctrl+shift+tab"
    ]);
  });

  test("still macifies ordinary desktop shortcuts on macOS", () => {
    expect(getKeybinding("newNote", true, true)).toEqual(["Command+n"]);
  });
});
