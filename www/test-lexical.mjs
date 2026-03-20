// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical/html';

const data = {
  "root": {
    "children": [
      {
        "children": [
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "Paragraph 1",
            "type": "text",
            "version": 1
          }
        ],
        "direction": null,
        "format": "start",
        "indent": 0,
        "type": "paragraph",
        "version": 1,
        "textFormat": 0,
        "textStyle": ""
      },
      {
        "children": [
          {
            "detail": 0,
            "format": 0,
            "mode": "normal",
            "style": "",
            "text": "Paragraph 2",
            "type": "text",
            "version": 1
          }
        ],
        "direction": null,
        "format": "start",
        "indent": 0,
        "type": "paragraph",
        "version": 1,
        "textFormat": 0,
        "textStyle": ""
      }
    ]
  }
};

const html = convertLexicalToHTML({ converters: defaultHTMLConverters, data });
console.log(html);
