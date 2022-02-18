import {ReadStream} from 'fs';

export type File = {
    unlink(): boolean;
    read(): false | ReadStream;
    write(buffer: string): boolean;
    toString(): string;
}
