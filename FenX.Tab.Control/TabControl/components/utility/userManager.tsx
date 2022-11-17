
import { FenXApi } from "../../services/axios/AxiosClient";
import { UserDto } from "../../services/Clients/AuthorizationQueryClient";

export class UserManager {

    fenXClient = FenXApi.getInstance();
    userString = "fen_users";

    // get all teams and store in sessionStorage
    private getUsers = async () => {
        return this.fenXClient.getAllUsers().then((response) => {
            window.sessionStorage.setItem(this.userString, JSON.stringify(response));
        });
    }

    // initialise in index.ts
    async init() {
        if (!window.sessionStorage.getItem(this.userString)) await this.getUsers();
    }

    // get a single team by Id (from sessionStorage or getTeams call)
    async getUser(id: string): Promise<UserDto | null> {
        let usersString = window.sessionStorage.getItem(this.userString);
        if (!usersString) await this.getUsers().then(() => { usersString = window.sessionStorage.getItem(this.userString) });

        const users = JSON.parse(usersString!) as UserDto[];

        var user = users.filter((item) => {
            return item.id === id;
        });

        return user[0];
    }

    // return all users
    async getAllUsers(): Promise<UserDto[] | null> {
        let usersString = window.sessionStorage.getItem(this.userString);
        if (!usersString) await this.getUsers().then(() => { usersString = window.sessionStorage.getItem(this.userString) });
        
        const users = JSON.parse(usersString!) as UserDto[];
        return users
    }
}