const isEventProp = (prop: any) => prop.startsWith('On');

export const createVDOM = (vNode: any) => {
  const { type, tagName, children = [], attributes = {}, events = [] } = vNode;

  if (type === 'root' && children.length > 1) throw new Error('최상위 태그로 묶여야 합니다.');

  const $node: any = type === 'root' ? createVDOM(children[0]) : document.createElement(tagName);

  // 해당 DOM 요소에 props 추가하기
  Object.entries(attributes).forEach(([key, value]) => {
    // event
    if (isEventProp(key)) {
      const eventName = key.replace('On', '').toLowerCase();
      $node.addEventListener(eventName, value);
    } else {
      $node.setAttribute(key, value);
    }
  });

  events.forEach(({ type, cb }: { type: string; cb: (...rest: any[]) => any }) => {
    $node.addEventListener(type, cb);
  });

  // 자식 요소에 대해서 재귀적으로 DOM Node로 변환하여 부모 요소에 추가
  children.forEach((child: any) => {
    const $child =
      child.type === 'Text' ? document.createTextNode(child.content) : createVDOM(child);

    $node.append($child);
  });

  return $node;
};

class TagStart {
  name: string;
  attributes: { [key: string]: any };
  constructor(name: string, tag: string) {
    this.name = name;
    this.attributes = this.getAttributes(tag);
  }

  getAttributes(str: string) {
    const attrsMap: { [key: string]: any } = {};
    str.replace(ATTR_REX, (match: any, name: string, ...rest: any[]): any => {
      const args = Array.prototype.slice.call(rest);
      const value = args[0]
        ? args[0]
        : args[1]
        ? args[1]
        : args[2]
        ? args[2]
        : isFillattrsMaker(name)
        ? name
        : '';

      attrsMap[name] = value.replace(/(^|[^\\])"/g, '$1\\"');
    });
    return attrsMap;
  }
}

class TagEmpty extends TagStart {
  constructor(name: string, tag: string) {
    super(name, tag);
  }
}

class TagEnd {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Text {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
}

const STARTTAG_REX =
  /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
const ENDTAG_REX = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
const ATTR_REX =
  /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

const makeMap = (str: string) => {
  return str.split(',').reduce((map: object, cur: string) => ({ ...map, [cur]: true }), {});
};

const EMPTY_MAKER = makeMap(
  'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr',
);

const FILLATTRS_MAKER = makeMap(
  'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected',
);

const isEmptyMaker = (tag: string) => !!EMPTY_MAKER[tag];

const isFillattrsMaker = (attr: string) => !!FILLATTRS_MAKER[attr];

const tokenize = (html: string) => {
  let string = html;
  const tokens = [];
  const maxTime = Date.now() + 1000;

  while (string) {
    if (string.indexOf('<!--') === 0) {
      const lastIndex = string.indexOf('-->') + 3;
      string = string.substring(lastIndex);
      continue;
    }
    if (string.indexOf('</') === 0) {
      const match = string.match(ENDTAG_REX);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      if (isEmptyMaker(name)) continue;

      tokens.push(new TagEnd(name));
      continue;
    }
    if (string.indexOf('<') === 0) {
      const match = string.match(STARTTAG_REX);
      if (!match) continue;
      string = string.substring(match[0].length);
      const name = match[1];
      const attrs = match[2];
      const token = isEmptyMaker(name) ? new TagEmpty(name, attrs) : new TagStart(name, attrs);

      tokens.push(token);
      continue;
    }

    const index = string.indexOf('<');
    const text = index < 0 ? string : string.substring(0, index);

    string = index < 0 ? '' : string.substring(index);
    tokens.push(new Text(text));

    if (Date.now() >= maxTime) break;
  }
  return tokens;
};

const ElEMENT_TYPE = 'Element';
const TEXT_TYPE = 'Text';

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

const createNodeFactory = (type: any, token: any) => {
  switch (type) {
    case ElEMENT_TYPE:
      return createElement(token);
    case TEXT_TYPE:
      return createText(token);
    default:
      break;
  }
};

const parse = (tokens: any) => {
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

export default (html: string) => parse(tokenize(html));
