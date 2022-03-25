import {Collection} from 'vano';
import {File} from '../File';

export type Artifact = {
    $$file: File,
    crc: string,
    context?: object,
    size?: number,
}

export type Artifacts = Collection<Artifact>;
