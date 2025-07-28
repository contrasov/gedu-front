import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const userRole = ref('');
    const userName = ref('');
    const userEmail = ref('');

    const getUserInfo = () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const decoded: any = jwtDecode(token);
            userName.value = decoded.name;
            userRole.value = decoded.type;
            userEmail.value = decoded.email;
        }
    };

    return {
        userRole,
        userName,
        userEmail,
        getUserInfo,
    };
};