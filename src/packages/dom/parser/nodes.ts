import { TagEmpty } from '../tokenizer/types';

export const ElEMENT_TYPE = 'Element';
export const TEXT_TYPE = 'Text';

const createElement = (token: any) => {
  const tagName = token.name;
  const attributes = token.attributes;
  if (token instanceof TagEmpty) {
    return {
      type: ElEMENT_TYPE,
      tagName,
      attributes,
    };
  }
  return {
    type: ElEMENT_TYPE,
    tagName,
    attributes,
    children: [],
  };
};

const createText = (token: any) => {
  const content = token.text.replace(/[\\n]|[?=\s]*/gi, '');
  return {
    type: TEXT_TYPE,
    content,
  };
};

export const createNodeFactory = (type: any, token: any) => {
  switch (type) {
    case ElEMENT_TYPE:
      return createElement(token);
    case TEXT_TYPE:
      return createText(token);
    default:
      break;
  }
};
