import { CanActivateFn } from '@angular/router';
import Swal, {SweetAlertOptions} from "sweetalert2";

export const aboutGuard: CanActivateFn = async (route, state) => {
  const config: SweetAlertOptions = {
    title: 'Are you sure?',
    html: 'Do you want to go to about page?',
    showDenyButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    icon: 'question'
  };

  const res = await Swal.fire(config);

  return res.isConfirmed;
};
