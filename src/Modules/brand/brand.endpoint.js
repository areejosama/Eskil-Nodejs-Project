import { roles } from '../../services/roles.js';

export const endpoint={
    Add:[roles.Admin],
    Delete:[roles.Admin],
    Update:[roles.Admin]
}