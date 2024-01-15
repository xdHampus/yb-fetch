# yb-fetch
This is a library for fetching data from YellowBridge.com for Chinese character and word data.
Library was written in TypeScript and depends on `axios` and `cheerio`.

## Installatio
With NPM:
```bash
npm i yb-fetch
```

## Build
```bash
pnpm run build
```

## Usage
```typescript
import * as yb from 'yb-fetch';
// get headers for authorized traversal 
// optional, but useful for multiple requests to reuse headers
const headers = await yb.getYellowBridgeHeaders();
// get character aggregate
const characterAggregate = await yb.getCharacterAggregate('我', headers);    
// get word aggregate
const wordAggregate = await yb.getWordAggregate('我很好', headers);
```

The following functions are made available by this library:
| Function | Return | Description |
| --- | --- | --- |
| getCharacterAggregate(character: string, headers?: YbHeaders) | Promise\<CharacterAggregate> | Get YellowBridge character aggregate |
| getWordAggregate(word: string, headers?: YbHeaders) | Promise\<WordAggregate> | Get YellowBridge word aggregate |
| getWordStrokeInfo(word: string, headers?: YbHeaders) | Promise\<WordStrokeInfo> | Get YellowBridge word stroke info |
| getCharacterEtymology(character: string, headers?: YbHeaders) | Promise\<CharacterEtymology> | Get YellowBridge character etymology data |
| getCharacterDetails(character: string, headers?: YbHeaders) | Promise\<CharacterDetails> | Get YellowBridge character details |
| getWordExamples(word: string, headers?: YbHeaders) | Promise\<WordExamples> | Get YellowBridge word example sentence data |
| getWordMeaning(word: string, headers?: YbHeaders) | Promise\<WordMeaning> | Get YellowBridge word meaning |
| getYellowBridgeHeaders() | Promise\<YbHeaders> | Get YellowBridge headers for repeated scraping |


## License
[MIT](https://choosealicense.com/licenses/mit/)