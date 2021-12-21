

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
import { chunkDate } from 'date-chunk';

const chunksWithSpecifiedQuantity = chunkDate({
  start: new Date('2021-10-17T00:00:00.000Z'),
  end: new Date('2022-10-16T00:00:00.000Z'),
  chunks: 2,
  strictSizedChunks: true, // default false
});

/*
[
  { start: 2021-10-17T00:00:00.000Z, end: 2022-04-17T00:00:00.000Z },
  { start: 2022-04-17T00:00:00.000Z, end: 2022-10-16T00:00:00.000Z }
]
*/

const chunksWithSpeicfiedSize = chunkDate({
  start: new Date('2021-10-17T00:00:00.000Z'),
  end: new Date('2022-10-16T00:00:00.000Z'),
  maxLimitPerChunk: [180, 'd'], // split date into chunks of 180 day max
});

/*
[
  { start: 2021-10-17T00:00:00.000Z, end: 2022-04-15T00:00:00.000Z },
  { start: 2022-04-15T00:00:00.000Z, end: 2022-10-12T00:00:00.000Z },
  { start: 2022-10-12T00:00:00.000Z, end: 2022-10-16T00:00:00.000Z }
]
*/

const chunksWithSpeicfiedSizeAndTimestamp = chunkDate({
  start: 1634428800000,
  end: new Date('2022-10-16T00:00:00.000Z'),
  maxLimitPerChunk: [180, 'd'], // split date into chunks of 180 day max
});

/*
[
  { start: 1634428800000, end: 2022-04-15T00:00:00.000Z },
  { start: 1649980800000, end: 2022-10-12T00:00:00.000Z },
  { start: 1665532800000, end: 2022-10-16T00:00:00.000Z }
]
*/

```

## API Reference
Full Typescript documentation -> [docs/modules.md](docs/modules.md)

### dateChunk(options)
| option param     | Description                                                                | Type                                                                   |
|------------------|----------------------------------------------------------------------------|------------------------------------------------------------------------|
| start            | Start date                                                                 | Date or milliseconds as number                                         |
| end              | End date                                                                   | Date or milliseconds as number                                         |
| maxLimitPerChunk | Set max limit for individual chunk                                         | Tuple of [number of time units, time unit (see supported units below)] |
| chunks           | How many chunks should be generated from start and end                     | number                                                                 |
| strictSizeChunks | Force flag to make chunks same size when there is remainder after division | boolean                                                                |

#### maxLimitPerChunk units
| Unit | Description |
|------|-------------|
| ms   | Millisecond |
| s    | Second      |
| m    | Minute      |
| h    | Hour        |
| d    | Day         |

#### ReturnType
Array Of
| Attribute | Description           | Type                                                                                |
|-----------|-----------------------|-------------------------------------------------------------------------------------|
| start     | Start date of a chunk | Date or milliseconds as number (returns type that was provided in params for start) |
| end       | End date of a chunk   | Date or milliseconds as number (returns type that was provided in params for start) |

## Changelog

The changelog can be found on the [Releases page](https://github.com/michalhonc/date-chunk/releases).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](Contributing.md).

## Authors and license

[Michal Honc](https://michalhonc.cz) and [contributors](https://github.com/michalhonc/date-chunk/graphs/contributors).

MIT License, see the included [License.md](License.md) file.
