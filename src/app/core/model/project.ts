import { Technology } from './technology';

interface IProject {
    id?: number;
    name: string;
    category: string;
    position: string;
    aboutProjectOne: string;
    aboutProjectTwo: string;
    priority: boolean;
    fileRef: string;
    image: any;
    creation: Date;
    technologyList: Technology[];
}

export class Project implements IProject {
    id?: number;
    name: string;
    category: string;
    position: string;
    aboutProjectOne: string;
    aboutProjectTwo: string;
    priority: boolean;
    fileRef: string;
    image: any;
    creation: Date;
    technologyList: Technology[];
}