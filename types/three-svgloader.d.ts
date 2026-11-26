/**
 * three ships SVGLoader as an addon with no declaration next to it, and its
 * package exports map routes `three/examples/jsm/*` to the plain .js files, so
 * TypeScript never reaches the copy in @types/three. This covers the slice of
 * the loader the scene uses.
 */
declare module 'three/examples/jsm/loaders/SVGLoader.js' {
  import { Loader, Shape, ShapePath } from 'three'

  export interface SVGResult {
    paths: ShapePath[]
    xml: unknown
  }

  export class SVGLoader extends Loader {
    static createShapes(shapePath: ShapePath): Shape[]
    parse(text: string): SVGResult
    load(
      url: string,
      onLoad?: (result: SVGResult) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: unknown) => void,
    ): void
  }
}
