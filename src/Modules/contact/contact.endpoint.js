import { roles } from "../../services/roles.js";

export const endpoint={
    Update:[roles.Admin],
    Get:[roles.Admin]
}