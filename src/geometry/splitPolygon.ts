import { path } from 'd3';
import { T_Path, T_Line, T_Point } from '../types';
import { lineLineIntersection } from './lineLineIntersection';

// https://geidav.wordpress.com/2015/03/21/splitting-an-arbitrary-polygon-by-a-line/

enum LineSide {
  Left,
  Right,
  On,
}

class Node {
  prev: Node | null = null;
  next: Node | null = null;
  start: T_Point;
  side: LineSide;
  distOnLine = 0;
  isSrcEdge = false;
  isDstEdge = false;
  visited = false;
  constructor(start: T_Point, side: LineSide) {
    this.start = start;
    this.side = side;
  }

  clone() {
    return new Node(this.start, this.side);
  }
}

function getSideOfLine([[x1, y1], [x2, y2]]: T_Line, [x, y]: T_Point) {
  const d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
  return d > 0 ? LineSide.Right : d < 0 ? LineSide.Left : LineSide.On;
}

function calcSignedDistance([[x1, y1], [x2, y2]]: T_Line, [x, y]: T_Point) {
  // scalar projection on line. in case of co-linear
  // vectors this is equal to the signed distance.
  return (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
}

function pointDistance([x1, y1]: T_Point, [x2, y2]: T_Point) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

export function splitPolygon(polygon: T_Path, splitLine: T_Line) {
  const { edgesOnLine } = splitEdges(polygon, splitLine);
  sortEdges(splitLine, edgesOnLine);

  splitPolygon2(edgesOnLine);
  // return CollectPolys();
}

function splitEdges(polygon: T_Path, splitLine: T_Line) {
  const splitPoly: Node[] = [];
  const edgesOnLine: Node[] = [];

  for (let i = 0; i < path.length; i++) {
    const edge: T_Line = [polygon[i], polygon[(i + 1) % polygon.length]];
    const edgeStartSide = getSideOfLine(splitLine, edge[0]);
    const edgeEndSide = getSideOfLine(splitLine, edge[1]);

    const pt = new Node(polygon[i], edgeStartSide);
    splitPoly.push(pt);

    if (edgeStartSide === LineSide.On) {
      edgesOnLine.push(pt);
    } else if (edgeStartSide !== edgeEndSide && edgeEndSide !== LineSide.On) {
      const { pt: intersectionPoint } = lineLineIntersection(splitLine, edge);
      const intPt = new Node(intersectionPoint!, LineSide.On);
      splitPoly.push(intPt);
      edgesOnLine.push(intPt);
    }
  }

  // connect doubly linked list, except
  // first->prev and last->next
  for (let i = 0; i < splitPoly.length - 1; i++) {
    const curr = splitPoly[i];
    const next = splitPoly[i + 1];
    curr.next = next;
    next.prev = curr;
  }

  // connect first->prev and last->next
  splitPoly[splitPoly.length - 1].next = splitPoly[0];
  splitPoly[0].prev = splitPoly[splitPoly.length - 1];

  return {
    splitPoly,
    edgesOnLine,
  };
}

function sortEdges(splitLine: T_Line, edgesOnLine: Node[]) {
  edgesOnLine.sort((a, b) => {
    // true if a < b
    // < 0 if a < b

    return calcSignedDistance(splitLine, a.start) <
      calcSignedDistance(splitLine, b.start)
      ? -1
      : 1;
  });

  // compute distance between each edge's start
  // position and the first edge's start position
  for (let i = 1; i < edgesOnLine.length; i++)
    edgesOnLine[i].distOnLine = pointDistance(
      edgesOnLine[i].start,
      edgesOnLine[0].start,
    );
}

function splitPolygon2(edgesOnLine: Node[]) {
  // PolyEdge *useSrc = nullptr;
  let useSrc = null;

  for (let i = 0; i < edgesOnLine.length; i++) {
    // find source
    // PolyEdge *srcEdge = useSrc;
    // useSrc = nullptr;
    let srcEdge = null;
    let dstEdge = null;

    for (; !srcEdge && i < edgesOnLine.length; i++) {
      // PolyEdge *curEdge = EdgesOnLine[i];
      const curEdge = edgesOnLine[i];
      const prevSide = curEdge.prev!.side;
      const nextSide = curEdge.next!.side;

      if (
        (prevSide === LineSide.Left && nextSide === LineSide.Right) ||
        (prevSide === LineSide.Left &&
          nextSide === LineSide.On &&
          curEdge.next!.distOnLine < curEdge.distOnLine) ||
        (prevSide === LineSide.On &&
          nextSide === LineSide.Right &&
          curEdge.prev!.distOnLine < curEdge.distOnLine)
      ) {
        srcEdge = curEdge;
        srcEdge.isSrcEdge = true;
      }
    }

    // find destination
    // PolyEdge *dstEdge = nullptr;

    for (; !dstEdge && i < edgesOnLine.length; ) {
      const curEdge = edgesOnLine[i];
      const prevSide = curEdge.prev!.side;
      const nextSide = curEdge.next!.side;

      // PolyEdge *curEdge = EdgesOnLine[i];
      // const auto curSide = curEdge->StartSide;
      // const auto prevSide = curEdge->Prev->StartSide;
      // const auto nextSide = curEdge->Next->StartSide;
      // assert(curSide == LineSide::On);

      if (
        (prevSide == LineSide.Right && nextSide == LineSide.Left) ||
        (prevSide == LineSide.On && nextSide == LineSide.Left) ||
        (prevSide == LineSide.Right && nextSide == LineSide.On) ||
        (prevSide == LineSide.Right && nextSide == LineSide.Right) ||
        (prevSide == LineSide.Left && nextSide == LineSide.Left)
      ) {
        dstEdge = curEdge;
        dstEdge.isDstEdge = true;
      } else {
        i++;
      }
    }

    // bridge source and destination
    if (srcEdge && dstEdge) {
      createBridge(srcEdge, dstEdge);
      // CreateBridge(srcEdge, dstEdge);
      // VerifyCycles();
      // // is it a configuration in which a vertex
      // // needs to be reused as source vertex?
      if (srcEdge.prev!.prev!.side === LineSide.Left) {
        // useSrc = srcEdge->Prev;
        useSrc = srcEdge.prev!;
        // useSrc->IsSrcEdge = true;
        useSrc.isSrcEdge = true;
      } else if (dstEdge.next!.side === LineSide.Right) {
        // useSrc = dstEdge;
        useSrc = dstEdge;
        // useSrc->IsSrcEdge = true;
        useSrc.isSrcEdge = true;
      }
    }
  }
}

function createBridge(srcEdge: Node, dstEdge: Node) {
  const a = srcEdge.clone();
  const b = dstEdge.clone();

  // SplitPoly.push_back(*srcEdge);
  // PolyEdge *a = &SplitPoly.back();
  // SplitPoly.push_back(*dstEdge);
  // PolyEdge *b = &SplitPoly.back();

  a.next = dstEdge;
  // a->Next = dstEdge;

  a.prev = srcEdge.prev;
  // a->Prev = srcEdge->Prev;

  b.next = srcEdge;
  // b->Next = srcEdge;

  b.prev = dstEdge.prev;
  // b->Prev = dstEdge->Prev;

  srcEdge.prev!.next = a;
  // srcEdge->Prev->Next = a;

  srcEdge.prev = b;
  // srcEdge->Prev = b;

  dstEdge.prev!.next = b;
  // dstEdge->Prev->Next = b;

  dstEdge.prev = a;
  // dstEdge->Prev = a;
}
