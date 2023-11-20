import { useAdminState } from "../Recoil/Admin/auth";
import { axiosClient } from "../Axios/AxiosClientProvider";

const useAdminAuth = () => {
    const { admin, setAdmin } = useAdminState();
    const adminStatus = () => {
        return admin ? true : false;
    };
    const fetchAdmin = async (): Promise<boolean> => {
        if (admin) {
            return true;
        }
        try {
            const res = await axiosClient.get("/api/admin");
            if (res.data.id !== null) {
                const admin = {
                    id: res.data.id,
                    name: res.data.name,
                    role: res.data.role,
                }
                setAdmin(admin);
                return true;
            }
            setAdmin(null);
            return false;
        } catch {
            return false;
        }
    };
    return { adminStatus, fetchAdmin };
};
export default useAdminAuth;