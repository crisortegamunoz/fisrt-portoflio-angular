interface ITechnology {
    id?: number;
    technologyName: string;
    category: string;
    priority: boolean;
    image?: any;
    fileRef?: string;
}

export class Technology implements ITechnology {
    id?: number;
    technologyName: string;
    category: string;
    priority: boolean;
    image?: any;
    fileRef?: string;
}