date-chunk / [Exports](docs/modules.md)

# date-chunk
Split date range into multiple chunks. You can divide date range either into specified number of chunks or via size of chunk.

## Install
```
yarn add date-chunk

npm install date-chunk

pnpm install date-chunk
```

## Use case
```js
import { dateChunk } from 'date-chunk';

const chunksWithSpecifiedQuantity = dateChunk({
  start: new Date(2021, 10, 17);
  end: new Date(2022, 10, 16);
  chunks: 2,
  strictSizedChunks: true, // or false
});

const chunksWithSpeicfiedSize = dateChunk({
  start: new Date(2021, 10, 17);
  end: new Date(2022, 10, 16);
  maxLimitPerChunk: [1, 'd'], // split date into chunks of 1 day max
});
```

## API Reference

#### maxLimitPerChunk units
| Unit | Description |
|------|-------------|
| ms   | Millisecond |
| s    | Second      |
| m    | Minute      |
| h    | Hour        |
| d    | Day         |

## Changelog

The changelog can be found on the [Releases page](https://github.com/michalhonc/date-chunk/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Michal Honc](https://michalhonc.cz) and [contributors](https://github.com/michalhonc/date-chunk/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
