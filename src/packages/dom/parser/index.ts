import { tokenize } from '../tokenizer';
import { TagStart, TagEnd, Text } from '../tokenizer/types';
import { ElEMENT_TYPE, TEXT_TYPE, createNodeFactory } from './nodes';

export const parse = (tokens: any) => {
  const root: any = {
    tag: 'root',
    children: [],
  };
  const tagArray: any = [root];
  tagArray.last = () => tagArray[tagArray.length - 1];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token instanceof TagStart) {
      const node = <
        {
          type: string;
          tagName: any;
          attributes: any;
          children: never[];
        }
      >createNodeFactory(ElEMENT_TYPE, token);
      if (node.children) {
        tagArray.push(node);
      } else {
        tagArray.last().children.push(node);
      }
      continue;
    }
    if (token instanceof TagEnd) {
      const parent = tagArray[tagArray.length - 2];
      const node = tagArray.pop();
      parent.children.push(node);
      continue;
    }
    if (token instanceof Text) {
      const text = <
        {
          type: string;
          content: any;
        }
      >createNodeFactory(TEXT_TYPE, token);
      if (text.content.trim() !== '')
        tagArray.last().children.push(createNodeFactory(TEXT_TYPE, token));
      continue;
    }
  }

  return root;
};

const htmlParser = (html: string) => parse(tokenize(html));

export default htmlParser;
