interface ICertificate {
    id?: number;
    course: string;
    code: string;
    category: string;
    learningPlatform: string;
    approved: string;
    fileRef: string;
    image: any;
}

export class Certificate implements ICertificate {
    id?: number;
    course: string;
    code: string;
    category: string;
    learningPlatform: string;
    approved: string;
    fileRef: string;
    image: any;
}