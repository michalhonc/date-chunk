# date-chunk

## Table of contents

### Interfaces

- [ChunkDateOptionsBase](interfaces/ChunkDateOptionsBase.md)
- [ChunksOptions](interfaces/ChunksOptions.md)
- [MaxLimitPerChunkOptions](interfaces/MaxLimitPerChunkOptions.md)

### Type aliases

- [ChunkDate](modules.md#chunkdate)
- [ChunkDateOptions](modules.md#chunkdateoptions)
- [Dates](modules.md#dates)
- [MaxLimitPerChunk](modules.md#maxlimitperchunk)
- [TimeType](modules.md#timetype)

### Functions

- [chunkDate](modules.md#chunkdate)

## Type aliases

### ChunkDate

Ƭ **ChunkDate**: `number` \| `Date`

#### Defined in

[types.ts:1](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/types.ts#L1)

___

### ChunkDateOptions

Ƭ **ChunkDateOptions**: [`ChunksOptions`](interfaces/ChunksOptions.md) \| [`MaxLimitPerChunkOptions`](interfaces/MaxLimitPerChunkOptions.md)

#### Defined in

[types.ts:26](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/types.ts#L26)

___

### Dates

Ƭ **Dates**: { `end`: [`ChunkDate`](modules.md#chunkdate) ; `start`: [`ChunkDate`](modules.md#chunkdate)  }[]

#### Defined in

[types.ts:7](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/types.ts#L7)

___

### MaxLimitPerChunk

Ƭ **MaxLimitPerChunk**: [`number`, [`TimeType`](modules.md#timetype)]

#### Defined in

[types.ts:5](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/types.ts#L5)

___

### TimeType

Ƭ **TimeType**: ``"ms"`` \| ``"s"`` \| ``"m"`` \| ``"h"`` \| ``"d"``

#### Defined in

[types.ts:3](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/types.ts#L3)

## Functions

### chunkDate

▸ **chunkDate**(`options`): [`Dates`](modules.md#dates)

Split date range into multiple chunks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChunkDateOptions`](modules.md#chunkdateoptions) | ChunkDateOptions |

#### Returns

[`Dates`](modules.md#dates)

Chunked date range

#### Defined in

[chunkDate.ts:27](https://github.com/michalhonc/date-chunk/blob/a33b2a5/src/chunkDate.ts#L27)
