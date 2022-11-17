
import { FenXApi } from "../../services/axios/AxiosClient";
import { TeamDto } from "../../services/Clients/AuthorizationQueryClient";

export class TeamsManager {

    fenXClient = FenXApi.getInstance();
    teamString = "fen_teams";

    // get all teams and store in sessionStorage
    private getTeams = async () => {
        return this.fenXClient.getAllTeams().then((response) => {
            window.sessionStorage.setItem(this.teamString, JSON.stringify(response));
        });
    }

    // initialise in index.ts
    async init() {
        if (!window.sessionStorage.getItem(this.teamString)) await this.getTeams();
    }

    // get a single team by Id (from sessionStorage or getTeams call)
    async getTeam(id: string): Promise<TeamDto | null> {
        let teamsString = window.sessionStorage.getItem(this.teamString);
        if (!teamsString) await this.getTeams().then(() => { teamsString = window.sessionStorage.getItem(this.teamString) });

        const teams = JSON.parse(teamsString!) as TeamDto[];

        var team = teams.filter((item) => {
            return item.id === id;
        });

        return team[0];
    }

    // return all teams
    async getAllTeams(): Promise<TeamDto[] | null> {
        let teamsString = window.sessionStorage.getItem(this.teamString);
        if (!teamsString) await this.getTeams().then(() => { teamsString = window.sessionStorage.getItem(this.teamString) });
        
        const teams = JSON.parse(teamsString!) as TeamDto[];
        return teams
    }
}