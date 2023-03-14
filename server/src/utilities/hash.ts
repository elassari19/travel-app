import { BinaryLike, pbkdf2Sync } from 'crypto'

export default (params: BinaryLike) => pbkdf2Sync(params, process.env.SALT!, 42, 64, `sha512`).toString(`hex`)