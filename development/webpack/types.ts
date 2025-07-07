import type { ChildProcess } from 'node:child_process';
import { type Readable } from 'node:stream';
import { type Socket } from 'node:net';
import { type IPty } from '@lydell/node-pty';

export type PTY = IPty & { master: Socket; slave: Socket; };

export type Child = ChildProcess & {
  stderr: Readable & { unref: () => Readable; };
  stdout: Readable & { unref: () => Readable; };
};

export type StdName = 'stdout' | 'stderr';

export type Stdio = {
  destroy: () => void;
  listen: (child: Child) => void;
  pty: Socket | 'pipe';
  resize: () => void;
  unref: (child: Child) => void;
};
