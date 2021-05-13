import decodeJwt from "jwt-decode";
import axios from "axios";

const authProvider = {
    login: ({ username, password }) => {
        return axios.post("http://localhost:8080/login", {
            email: username,
            password: password
        })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                const token = response.headers.authorization.split(" ")[1];
                const decodedToken = decodeJwt(token);
                const role = decodedToken.roles[0];

                if (role != "ROLE_ADMIN" || role === null) {
                    throw new Error("You must be an admin");
                } else {
                    localStorage.setItem("jwt", token);
                    localStorage.setItem("permissions", role);
                }
            })
            .then(() => {
                const token = localStorage.getItem("jwt");

                return axios.get("http://localhost:8080/api/user/restaurant", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        localStorage.setItem("restaurant", response.data);
                        window.location.reload();
                    });
            })
            .catch(error => {
                console.log(error);
            })
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem("permissions")
        return Promise.resolve();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('jwt')
            ? Promise.resolve()
            : Promise.reject();
    },
    getPermissions: () => {
        /*
        const role = localStorage.getItem("permissions");
        return role ? Promise.resolve(role) : Promise.reject();
        */
        return Promise.resolve();
    }
};

export default authProvider;