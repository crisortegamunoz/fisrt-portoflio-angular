interface IFile {
    name: string;
    imageFile: File;
    size: string;
    type: string;
}

export class File implements IFile {
    name: string;
    imageFile: File;
    size: string;
    type: string;
}