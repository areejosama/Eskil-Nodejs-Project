import { roles } from "../../services/roles.js";

export const endpoint={
    Update:[roles.Admin],
    Create:[roles.Admin],
    Delete:[roles.Admin]
}
