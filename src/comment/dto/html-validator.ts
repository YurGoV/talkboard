const validator = require('html-validator');
import { JSDOM } from 'jsdom';

const allowedTags = [
  'html',
  'head',
  'meta',
  'title',
  'body',
  'a',
  'code',
  'i',
  'strong',
];

export async function isValidXhtml(content: string): Promise<boolean> {
  const options = {
    data: content,
    format: 'text',
  };

  try {
    const result = await validator(options);

    if (
      result.includes(
        'The document validates according to the specified schema',
      )
    ) {
      const { window } = new JSDOM(content);
      const elements = window.document.querySelectorAll('*');
      for (const element of elements) {
        const tagName = element.tagName.toLowerCase();
        if (!allowedTags.includes(tagName)) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
