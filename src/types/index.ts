export interface Player {
    id: string;
    name: string;
    is_owner: boolean;
}

export interface CardType {
    id: string;
    number: number;
    holder?: string;
}

export enum GameState {
    LOBBY = "in_lobby",
    PLAYING = "started",
    WON = "won",
    LOST = "lost",
}

export type AlertType = 'success' | 'error' | 'info';
