// Invent a Word We Need — make.fun entry (u-deranalabs-invent-a-word-we-need-17a020e0)
//
// Prints one invented English word together with its one-line definition,
// deterministically, to stdout and to /output/entry.txt — the file the
// competition's gate checks (UTF-8 text, 1-140 characters) and the judge
// reads. No network, no input, no randomness: two runs are byte-identical.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one invented word and its definition in a single clear line.
const ENTRY =
  "Wavemiss: waving back at a stranger who was waving at the person behind you.";

const MAX_CHARS = 140;

// Hard guard: one line, 1-140 characters, not only whitespace. Length is
// counted in Unicode code points, the way the gate counts characters.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} characters, got ${charCount}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
// Write the entry exactly, with no trailing newline, so the file the gate
// reads holds precisely the one line above. Then read it back and fail
// loudly if what landed on disk differs from the entry by even one byte.
writeFileSync("/output/entry.txt", ENTRY, "utf8");
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk does not match the entry");
}
process.stdout.write(ENTRY + "\n");
