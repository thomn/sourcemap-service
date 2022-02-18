import {Collection} from 'vano';
import {File} from '../File';

export type Artifact = {
    $$file: File,
    crc: string,
}

export type Artifacts = Collection<Artifact>;
