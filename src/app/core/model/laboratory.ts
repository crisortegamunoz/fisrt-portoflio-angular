import { Technology } from './technology';

interface ILaboratory {
    id?: number;
    name: string;
    laboratoryDescription: string;
    urlDemo: string;
    urlRepo: string;
    fileRef: string;
    image: any;
    creation: Date;
    technologyList: Technology[];
}

export class Laboratory implements ILaboratory {
    id?: number;
    name: string;
    laboratoryDescription: string;
    urlDemo: string;
    urlRepo: string;
    fileRef: string;
    image: any;
    creation: Date;
    technologyList: Technology[];
}