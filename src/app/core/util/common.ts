export class CommonUtils {

    public static undefinedNullOrEmpty(value: string | number): boolean {
        let notValid = false;

        if (value === undefined || value === null || value === '') {
            notValid = true;
        }

        return notValid;
    }

}