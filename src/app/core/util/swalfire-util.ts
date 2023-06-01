import { HttpResponseBase } from '@angular/common/http';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

export class SwalUtils {

    public static showCreationMessage(entity: string): void {
        Swal.fire('Created!', `Your ${entity} has been created successfully`, 'success'); 
    }

    public static showUpdatedMessage(entity: string): void {
        Swal.fire('Updated!', `Your ${entity} has been created successfully`, 'success'); 
    }

    public static showErrorEmptyParam(object: string): void {
        Swal.fire('Ups!', `El valor ingresado para la búsqueda del ${object} no es válido`, 'error');
    }

    public static showErrorByHttpResponse(errorResponse: HttpResponseBase, customMessage: string): boolean {
        let doSomething = false;
        
        if (!errorResponse.ok) {
            if (errorResponse.status === 0) {
                Swal.fire('Ha ocurrido un error', `${customMessage}, favor intentelo más tarde`, 'error');
            } else if (errorResponse.status === 404) {
                doSomething = true;
            } else if (errorResponse.status === 500) {
                Swal.fire('Ha ocurrido un error', `Hubo un problema desde el servidor al recurrir al ${customMessage}, favor intentelo más tarde`, 'error');
            } else if (errorResponse.status === 504) {
                doSomething = true;
            }
        }

        return doSomething;
    }

}