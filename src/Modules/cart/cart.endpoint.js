import { roles } from "../../services/roles.js";

export const endpoint={
    Create:[roles.User],
    Delete:[roles.User],
    Get:[roles.User]
}
